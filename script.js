let childrenBirthdates = [];

function addChild() {
    const dateInput = document.getElementById("childBirthdate");
    const birthdate = dateInput.value;

    if (!birthdate) {
        alert("生年月日を入力してください。");
        return;
    }

    childrenBirthdates.push(new Date(birthdate));
    childrenBirthdates.sort((a, b) => a - b); // 生年月日順に並べる
    updateChildrenList();
    dateInput.value = "";
}

function updateChildrenList() {
    const list = document.getElementById("children-list");
    list.innerHTML = "";
    childrenBirthdates.forEach((date, index) => {
        const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD形式
        const li = document.createElement("li");
        li.textContent = `第${index + 1}子: ${formattedDate}`;
        list.appendChild(li);
    });
}

function calculateAllowance() {
    if (childrenBirthdates.length === 0) {
        alert("お子様の生年月日を入力してください。");
        return;
    }

    let resultsByYear = {};
    let totalAmount = 0;
    let latestEndYear = Math.max(...childrenBirthdates.map(d => d.getFullYear())) + 19;

    for (let year = Math.min(...childrenBirthdates.map(d => d.getFullYear())); year < latestEndYear; year++) {
        let yearTotal = 0;
        let eligibleChildren = childrenBirthdates.filter(d => year >= d.getFullYear() && year < d.getFullYear() + 19);
        eligibleChildren.sort((a, b) => a - b);

        eligibleChildren.forEach((birthdate, index) => {
            let age = year - birthdate.getFullYear();
            let amount = 0;

            if (age < 3) {
                amount = 15000;
            } else if (age < 12) {
                amount = (index >= 2) ? 15000 : 10000;
            } else if (age < 15) {
                amount = 10000;
            }

            yearTotal += amount;
        });

        resultsByYear[year] = yearTotal;
        totalAmount += yearTotal;
    }

    displayResults(resultsByYear, totalAmount);
}

function displayResults(results, total) {
    const resultArea = document.getElementById("result-area");
    resultArea.innerHTML = "<h3>支給額一覧</h3>";

    for (let year in results) {
        resultArea.innerHTML += `<p>${year}年: ${results[year].toLocaleString()}円</p>`;
    }

    resultArea.innerHTML += `<h2>総支給額: ${total.toLocaleString()}円</h2>`;
}
