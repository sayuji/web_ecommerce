let tax = 0,
totalBeforeTax = 0,
totalAfterTax = 0

function addToCart(data) {
    totalBeforeTax += parseInt(data.harga);
    tax = 10/100 * totalBeforeTax;
    totalAfterTax = tax + totalBeforeTax;
    $('#total').html(totalAfterTax)
    $('#tax').html(tax)
    if ($('#card-'+data.id).length == 0) {
        $("#cart").append(`<div class="card" id="card-`+data.id+`">
    <div class="card-text">
        <div class="card-row">
            <div class="left-text">`+data.nama+`</div>
            <div>Rp. <span class="subtotal">`+data.harga+`</span></div>
        </div>
        <div class="card-row">  
            <div class="left-text">Unit Price:</div>
            <div>Rp. `+data.harga+`</div>
            <div>Quantity</div>
            <div class="quantity">1</div>
        </div>
    </div>
    <div class="trash-icon" onclick="deleteCard(`+data.id+`)"><i class='bx bx-trash bx-md'></i></div>
</div>`)
    }
    else {
        var quantity = $('#card-'+data.id).find('.quantity').html()
        var quantityNew = parseInt(quantity) + 1
        $('#card-'+data.id).find('.quantity').html(quantityNew)
        $('#card-'+data.id).find('.subtotal').html(quantityNew * data.harga)
    }
}

function deleteCard(dataid) {
    if (confirm("Apakah anda yakin ingin menghapus pesanan ini?")) {
        let subtotal = $('#card-'+dataid).find('.subtotal').html()
        totalBeforeTax -= parseInt(subtotal);
        tax = 10/100 * totalBeforeTax;
        totalAfterTax = tax + totalBeforeTax;
        $('#total').html(totalAfterTax)
        $('#tax').html(tax)
        $('#card-'+dataid).remove()   
    }
}

function filterItems() {
    var input, filter, section, isi, p, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    section = document.querySelector(".kanan section");
    isi = section.getElementsByClassName("isi");

    for (i = 0; i < isi.length; i++) {
        p = isi[i].getElementsByTagName("p")[0];
        txtValue = p.textContent || p.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            isi[i].style.display = "";
        } else {
            isi[i].style.display = "none";
        }
    }
}

document.getElementById("search-btn").addEventListener("click", filterItems);


function printbtn() {
    var originalContents = document.body.innerHTML;
    var printContents = $('.kiri').html();
    document.body.innerHTML = printContents
    window.print();
    document.body.innerHTML = originalContents;
}