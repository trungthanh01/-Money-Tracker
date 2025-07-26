// --- CONFIGURATION ---
    // Mỗi hũ sẽ có tên, màu sắc và mô tả.
    const jarsConfig = {
            spending: { 
                name: "Chi tiêu", 
                color: "bg-blue-500", 
                description: "Tiền chi tiêu hàng ngày (ăn uống, đi lại, hóa đơn...)" 
            },
            emergency: { 
                name: "Khẩn cấp", 
                color: "bg-red-500", 
                description: "Quỹ dự phòng cho các trường hợp bất ngờ, mục tiêu 6 tháng chi tiêu." 
            },
            saving: { 
                name: "Tiết kiệm", 
                color: "bg-green-500", 
                description: "Dành cho các mục tiêu lớn (du lịch, mua sắm, xe cộ...)" 
            },
            investment: { 
                name: "Đầu tư", 
                color: "bg-purple-500", 
                description: "Gia tăng tài sản qua các kênh đầu tư (chứng khoán, crypto...)" 
            },
            education: { 
                name: "Học tập", 
                color: "bg-yellow-500", 
                description: "Đầu tư cho kiến thức và phát triển bản thân." 
            }
        };
        
        // --- STATE MANAGEMENT ---
            // Biến 'state' sẽ chứa toàn bộ dữ liệu của ứng dụng.
            let state = {
                jars: {},
                transactions: [],
                totalBalance: 0,
                investmentWallet: { apiKey: '', address: ''}
            };

            let jarsChart = null;

        // --- DOM ELEMENTS ---
            const totalBalanceEl = document.getElementById('total-balance');
            const jarsContainer = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3.xl\\:grid-cols-5.gap-6'); //lấy các class từ tailwind để lấy đúng phần tử chứa các hũ tiền
        
        // Modals
            // Các modal sẽ được sử dụng để thêm giao dịch và xem chi tiết hũ tiền.
            const transactionModal = document.getElementById('transaction-modal');
            const transactionForm = document.getElementById('transaction-form');
            const jarDetailModal = document.getElementById('jar-detail-modal');

        // --- LOCAL STORAGE FUNCTIONS ---
        // Lưu trạng thái hiện tại của ứng dụng vào Local Storage của trình duyệt.
        const saveStateToLocalStorage = () => {
            localStorage.setItem('financeAppData', JSON.stringify(state));
        };

        // Tải trạng thái đã lưu từ Local Storage khi mở ứng dụng.
        const loadStateFromLocalStorage = () => {
            const savedData = localStorage.getItem('financeAppData');
            if (savedData) {
                state = JSON.parse(savedData);
            } else {
                // Nếu chưa có dữ liệu, khởi tạo trạng thái mặc định.
                Object.keys(jarsConfig).forEach(id => {
                    state.jars[id] = { balance: 0 };
                });
            }
        };
//===============đã đọc tới đây=====//
        // --- UTILITY FUNCTIONS ---
        const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

        const showView = (viewId) => {
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.getElementById(`${viewId}-view`).classList.add('active');
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.toggle('active-nav-btn', btn.dataset.view === viewId);
            });
        };
        
        const showModal = (modalId) => document.getElementById(modalId).classList.replace('hidden', 'flex');
        const hideModal = (modalId) => document.getElementById(modalId).classList.replace('flex', 'hidden');

        // --- RENDER FUNCTIONS ---
        // Hàm này "vẽ" lại toàn bộ giao diện Bảng tin dựa trên dữ liệu trong biến 'state'.
        const renderDashboard = () => {
            // Tính toán lại tổng số dư
            state.totalBalance = Object.values(state.jars).reduce((sum, jar) => sum + (jar.balance || 0), 0);
            totalBalanceEl.textContent = formatCurrency(state.totalBalance);
            
            jarsContainer.innerHTML = ''; // Xóa các hũ cũ để vẽ lại
            
            Object.keys(jarsConfig).forEach(jarId => {
                const config = jarsConfig[jarId];
                const balance = state.jars[jarId]?.balance || 0;
                const jarCard = `
                    <div data-jar-id="${jarId}" class="jar-card bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="font-bold text-lg">${config.name}</h3>
                            <div class="w-4 h-4 rounded-full ${config.color}"></div>
                        </div>
                        <p class="text-2xl font-semibold text-gray-800">${formatCurrency(balance)}</p>
                        <p class="text-sm text-gray-500 mt-1">${config.description}</p>
                    </div>
                `;
                jarsContainer.innerHTML += jarCard;
            });
            
            document.querySelectorAll('.jar-card').forEach(card => {
                card.addEventListener('click', () => showJarDetail(card.dataset.jarId));
            });

            renderChart();
        };
        
        // Vẽ lại biểu đồ tròn
        const renderChart = () => {
            const ctx = document.getElementById('jars-chart').getContext('2d');
            const labels = Object.values(jarsConfig).map(j => j.name);
            const data = Object.keys(jarsConfig).map(id => state.jars[id]?.balance || 0);
            const colors = Object.values(jarsConfig).map(j => {
                const colorMap = { 'bg-blue-500': '#3b82f6', 'bg-red-500': '#ef4444', 'bg-green-500': '#22c55e', 'bg-purple-500': '#8b5cf6', 'bg-yellow-500': '#eab308' };
                return colorMap[j.color];
            });

            if (jarsChart) {
                jarsChart.data.labels = labels;
                jarsChart.data.datasets[0].data = data;
                jarsChart.update();
            } else {
                jarsChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Số dư',
                            data: data,
                            backgroundColor: colors,
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            tooltip: {
                                callbacks: {
                                    label: (context) => `${context.label}: ${formatCurrency(context.parsed)}`
                                }
                            }
                        }
                    }
                });
            }
        };

        const showJarDetail = (jarId) => {
            const config = jarsConfig[jarId];
            document.getElementById('jar-detail-title').textContent = `Chi tiết hũ: ${config.name}`;
            document.getElementById('jar-detail-description').textContent = config.description;

            const transactionListEl = document.getElementById('jar-detail-transactions');
            
            const filteredTransactions = state.transactions.filter(t => t.jarId === jarId);
            
            if (filteredTransactions.length === 0) {
                transactionListEl.innerHTML = '<p class="text-gray-500">Không có giao dịch nào trong hũ này.</p>';
            } else {
                transactionListEl.innerHTML = filteredTransactions.map(t => {
                    const amountClass = t.type === 'income' ? 'text-green-600' : 'text-red-600';
                    const sign = t.type === 'income' ? '+' : '-';
                    return `
                        <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                            <div>
                                <p class="font-medium">${t.description}</p>
                                <p class="text-sm text-gray-500">${new Date(t.createdAt).toLocaleDateString('vi-VN')}</p>
                            </div>
                            <p class="font-semibold ${amountClass}">${sign}${formatCurrency(t.amount)}</p>
                        </div>
                    `;
                }).join('');
            }

            showModal('jar-detail-modal');
        };

        const renderInvestmentView = () => {
            document.getElementById('etherscan-api-key').value = state.investmentWallet.apiKey || '';
            document.getElementById('wallet-address').value = state.investmentWallet.address || '';
        };

        // --- DATA HANDLING ---
        const handleTransactionSubmit = (e) => {
            e.preventDefault();
            const type = document.getElementById('transaction-type').value;
            const amount = parseFloat(document.getElementById('transaction-amount').value);
            const description = document.getElementById('transaction-description').value;
            const jarId = document.getElementById('transaction-jar').value;

            if (isNaN(amount) || amount <= 0 || !description || !jarId) {
                console.error("Dữ liệu giao dịch không hợp lệ");
                return;
            }

            const currentBalance = state.jars[jarId]?.balance || 0;
            let newBalance;

            if (type === 'income') {
                newBalance = currentBalance + amount;
            } else { // expense
                if (currentBalance < amount) {
                    console.error(`Số dư trong hũ "${jarsConfig[jarId].name}" không đủ.`);
                    // Trong ứng dụng thực tế, bạn nên hiển thị thông báo này cho người dùng.
                    return;
                }
                newBalance = currentBalance - amount;
            }
            
            // 1. Cập nhật số dư hũ trong 'state'
            state.jars[jarId].balance = newBalance;

            // 2. Thêm giao dịch mới vào mảng 'transactions' trong 'state'
            const newTransaction = {
                type,
                amount,
                description,
                jarId,
                createdAt: new Date().toISOString() // Lưu thời gian dưới dạng chuỗi ISO
            };
            state.transactions.unshift(newTransaction); // Thêm vào đầu mảng

            // 3. Lưu trạng thái mới vào Local Storage
            saveStateToLocalStorage();

            // 4. Vẽ lại giao diện
            renderDashboard();

            // 5. Đóng modal và reset form
            hideModal('transaction-modal');
            transactionForm.reset();
        };
        
        const saveWalletInfo = () => {
            state.investmentWallet.apiKey = document.getElementById('etherscan-api-key').value.trim();
            state.investmentWallet.address = document.getElementById('wallet-address').value.trim();
            saveStateToLocalStorage();
            console.log("Thông tin ví đã được lưu.");
        };

        // --- API INTEGRATIONS ---
        const trackWallet = async () => {
            const apiKey = document.getElementById('etherscan-api-key').value.trim();
            const address = document.getElementById('wallet-address').value.trim();
            
            const errorEl = document.getElementById('wallet-error');
            
            if (!apiKey || !address) {
                errorEl.textContent = 'Vui lòng nhập API Key và Địa chỉ ví.';
                errorEl.classList.remove('hidden');
                return;
            }
            
            saveWalletInfo();

            const loadingEl = document.getElementById('wallet-loading');
            const resultsEl = document.getElementById('wallet-results');
            const assetsEl = document.getElementById('wallet-assets');

            loadingEl.classList.remove('hidden');
            errorEl.classList.add('hidden');
            resultsEl.classList.add('hidden');
            assetsEl.innerHTML = '';

            try {
                const balanceUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
                const balanceResponse = await fetch(balanceUrl);
                const balanceData = await balanceResponse.json();

                if (balanceData.status !== "1") throw new Error(balanceData.message || 'Không thể lấy số dư ETH.');

                const ethBalance = parseFloat(balanceData.result) / 1e18;
                const ethPriceUSD = 3000; // Placeholder price
                const ethValueUSD = ethBalance * ethPriceUSD;

                assetsEl.innerHTML = `
                    <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                        <span>ETH</span>
                        <span>${ethBalance.toFixed(4)}</span>
                        <span>~${formatCurrency(ethValueUSD * 25000)}</span>
                    </div>
                `;
                
                document.getElementById('wallet-total-value').textContent = `~${formatCurrency(ethValueUSD * 25000)}`;
                resultsEl.classList.remove('hidden');

            } catch (error) {
                console.error("Wallet tracking error:", error);
                errorEl.textContent = `Lỗi: ${error.message}`;
                errorEl.classList.remove('hidden');
            } finally {
                loadingEl.classList.add('hidden');
            }
        };
        
        const getEducationSuggestions = async () => {
            const interestField = document.getElementById('interest-field').value.trim();
            if (!interestField) {
                console.error("Lĩnh vực quan tâm trống.");
                return;
            }

            const loadingEl = document.getElementById('suggestions-loading');
            const resultEl = document.getElementById('suggestions-result');
            
            loadingEl.classList.remove('hidden');
            resultEl.innerHTML = '';

            const prompt = `Với vai trò là một cố vấn học tập, hãy gợi ý một lộ trình phát triển bản thân cho người quan tâm đến lĩnh vực "${interestField}". Gợi ý cần bao gồm:
1.  **Sách nên đọc:** Liệt kê 3-5 cuốn sách từ cơ bản đến nâng cao.
2.  **Khóa học online:** Gợi ý 2-3 khóa học uy tín (ví dụ trên Coursera, Udemy, edX) với mô tả ngắn.
3.  **Lộ trình (Roadmap) cơ bản:** Các bước hoặc các kỹ năng cần học theo thứ tự để làm chủ lĩnh vực.
Hãy trình bày câu trả lời bằng tiếng Việt, sử dụng định dạng Markdown.`;
            
            try {
                const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
                const payload = { contents: chatHistory };
                const geminiApiKey = ""; // Để trống để Canvas tự xử lý
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error(`API call failed: ${response.status}`);

                const result = await response.json();
                
                if (result.candidates && result.candidates[0]?.content.parts[0]?.text) {
                    const text = result.candidates[0].content.parts[0].text;
                    let html = text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/(\d\.) /g, '<br><strong>$1</strong> ')
                        .replace(/### (.*)/g, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
                        .replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
                        .replace(/\n/g, '<br>');
                    resultEl.innerHTML = html;
                } else {
                    throw new Error("Không nhận được phản hồi hợp lệ từ AI.");
                }

            } catch (error) {
                console.error("Error getting suggestions:", error);
                resultEl.innerHTML = `<p class="text-red-500">Đã xảy ra lỗi khi lấy gợi ý. Vui lòng thử lại. Lỗi: ${error.message}</p>`;
            } finally {
                loadingEl.classList.add('hidden');
            }
        };

        // --- EVENT LISTENERS ---
        const setupEventListeners = () => {
            // Navigation
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.addEventListener('click', () => showView(btn.dataset.view));
            });

            // Transaction Modal
            document.getElementById('add-income-btn').addEventListener('click', () => {
                document.getElementById('transaction-modal-title').textContent = 'Thêm Thu Nhập';
                document.getElementById('transaction-type').value = 'income';
                transactionForm.reset();
                showModal('transaction-modal');
            });
            document.getElementById('add-expense-btn').addEventListener('click', () => {
                document.getElementById('transaction-modal-title').textContent = 'Thêm Chi Tiêu';
                document.getElementById('transaction-type').value = 'expense';
                transactionForm.reset();
                showModal('transaction-modal');
            });
            document.getElementById('cancel-transaction-btn').addEventListener('click', () => hideModal('transaction-modal'));
            transactionModal.querySelector('.modal-backdrop').addEventListener('click', () => hideModal('transaction-modal'));
            transactionForm.addEventListener('submit', handleTransactionSubmit);
            
            // Jar Detail Modal
            document.getElementById('close-jar-detail-btn').addEventListener('click', () => hideModal('jar-detail-modal'));
            jarDetailModal.querySelector('.modal-backdrop').addEventListener('click', () => hideModal('jar-detail-modal'));

            // Investment View
            document.getElementById('track-wallet-btn').addEventListener('click', trackWallet);
            
            // Education View
            document.getElementById('get-suggestions-btn').addEventListener('click', getEducationSuggestions);

            // Populate jar dropdown
            const jarSelect = document.getElementById('transaction-jar');
            jarSelect.innerHTML = Object.keys(jarsConfig).map(id => `<option value="${id}">${jarsConfig[id].name}</option>`).join('');
        };

        // --- INITIALIZATION ---
        // Hàm này sẽ chạy ngay khi trang web được tải xong.
        document.addEventListener('DOMContentLoaded', () => {
            loadStateFromLocalStorage(); // Tải dữ liệu đã lưu
            renderDashboard(); // Vẽ giao diện ban đầu
            renderInvestmentView(); // Cập nhật thông tin ví đã lưu (nếu có)
            setupEventListeners(); // Gắn các "tai nghe" sự kiện
            showView('dashboard'); // Hiển thị Bảng tin làm màn hình mặc định
        });