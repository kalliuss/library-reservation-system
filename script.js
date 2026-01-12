const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("masa");
const seats = document.querySelectorAll(".seat:not(.reserved)")
const number = document.getElementById("numara");
// rezerve olmayan koltukları aldık
getFromLocalStorage();
calculteTotal();

// koltuk seçince renk değiştirme
container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("reserved")){
        e.target.classList.toggle("selected"); // selected varsa sil yoksa ekle
        calculteTotal(); // her seçimde hesaplaması için
    }
});

//hem koltuk sıfırlar hemde masa saklama
select.addEventListener("change", (e) => {
    clearSeat();
    number.innerText = select.value;
    saveToMasaLocalStorage();
});




function calculteTotal(){
    const selectedSeats = container.querySelectorAll(".seat.selected");

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach((seat) => {
        selectedSeatsArr.push(seat);
    })

    seats.forEach((seat) => {
        seatsArr.push(seat);
    })

    let selectedSeatIndexs = selectedSeatsArr.map((seat) => {
        return seatsArr.indexOf(seat);
    })

    console.log(selectedSeatIndexs)

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    
    const selectedSeatNumbers = selectedSeatsArr.map((seat) => {
        return seat.innerText.trim();
    })

    amount.innerText = selectedSeatNumbers.join(",");

    saveToLocalStorage(selectedSeatIndexs);
    saveSeatNumber(selectedSeatNumbers)
    
    
    
};



// addEvent lsitenerda çalıştırdığımızda masa değiişiminde koltuk seçimini temizleme
function clearSeat(){
    seats.forEach((seat) => {
        seat.classList.remove("selected");
    })
    calculteTotal();
}



function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    const seatNumbers = JSON.parse(localStorage.getItem("seatNumbers"));
    const selectedMasaValue = localStorage.getItem("selectedMasa");

    //masa değeri saklama
    if(selectedMasaValue !== null){
        number.innerText = selectedMasaValue;
    }

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach(function(seat, index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        })
    }

    //koltuk numara saklama
    if(seatNumbers !== null && seatNumbers.length > 0){
        amount.innerText = seatNumbers.join(",");
    }

    //masa numara saklama
    const selectedMasaIndex = localStorage.getItem("selectedMasaIndex");

    if(selectedMasaIndex !== null){
        select.selectedIndex = Number(selectedMasaIndex);
    }

    

}


function saveSeatNumber(indexs){
    localStorage.setItem("seatNumbers", JSON.stringify(indexs))
}

function saveToMasaLocalStorage(masa){
    localStorage.setItem("selectedMasa", select.value);
    localStorage.setItem("selectedMasaIndex", String(select.selectedIndex));
}


function saveToLocalStorage(indexs){
    localStorage.setItem("selectedSeats", JSON.stringify(indexs));
}

