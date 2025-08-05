# header
bao gồm tên của app 
# navigation
các nút điều hướng bảng tin, đầu tư và học tập. sử dụng dataview đã có sẵn ở html để điều hướng.
# main content
phần này quan trọng bao gồm các nút như:
- thêm thu nhập
- thêm chi tiêu
- nhập lương
các nút này cần gắn sự kiện addeventlistener bằng id của từng nút, mỗi khi click vào sẽ xuất hiện modal pop up. 

Hiển thị tổng lương 

# Modal: nhập thông tin và phân bổ tài sản (quan trọng)
bao gồm: form, input, data, submit, và còn nhiều hơn tôi không biết. 
phần này user nhập thông tin vào để chọn hủ, sau đó sẽ phân bổ tiền đi nhiều hủ khác nhau theo tỉ lệ
lấy data từ input form để process tính toán và phân bổ tiền ra các hủ, phần này tôi không hiểu ở phần tính toán logic.
* lưu ý: tôi muốn thêm một hủ nữa là 'nợ'. khi user nhập lương vào thì tiền sẽ tự động phân bổ thành 6 hủ theo tỉ lệ và user có thể tùy chỉnh tỉ lệ % tùy ý cho từng hủ ở modal này khi user click vào nút nhập lương

# phần chart.js 
là khi user nhập thông tin vào modal ban đầu sẽ update thông tin hiển thị phân bổ tài sản lên chart. nó có logic đó là khi nhập lương thì lương sẽ được phân bổ thành 6 hủ, tự động update tỉ lệ lên chart, khi chi tiêu thì sẽ giảm số lượng phân bổ xuống

<script>
    ta cần gắn sự kiện lắng nghe click
    const addIncome = document.getElementById('add-income-btn') 
    const transactionModal = document.getElementById('transaction-modal')
    addIncome.addEventListener('click', function(){
        transactionModal.classList.add('active')
    }
        
    })
</script>

1. cần lấy id và cả phần tử html để display nó lên screen
2. tôi thấy lỗi syntax và đã sửa lại
3. nếu nó đã hidden thì mình cần hidden: none nó