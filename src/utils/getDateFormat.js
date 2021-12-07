const getMonth = (n) => {
	const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthList[n]
}

function getOrdinalNumber(n){
    return n + (n > 0 ? ["th","st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : "");
}

function formatDate (date) {
    let day = getOrdinalNumber(date.getDay())
    let month = getMonth(date.getMonth())
    let year = new Date().getFullYear();
    let formatedDate = `${day} ${month}, ${year}`
    return formatedDate
}

export {
    formatDate,
    getMonth,
    getOrdinalNumber
}

// or do module.exports to export multiple