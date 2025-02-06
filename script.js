document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addChildButton").addEventListener("click", addChild);
    document.getElementById("calculateButton").addEventListener("click", calculateAllowance);
});

let childrenBirthdates = [];

function addChild() {
    const dateInput = document.getElementById("childBirthdate");
    const birthdateStr = dateInput.value;

    if (!birthdateStr) {
        alert("生年月（年と月）を入力してください。");
        return;
    }

    const [year, month] = birthdateStr.split("-").map(Number);
    childrenBirthdates.push({ year, month });

    // ソート（年 → 月の順）
    childrenBirthdates.sort((a, b) => a.year - b.year || a.month - b.month);

    updateChildrenList();
    dateInput.value = ""; // 入力欄をクリア
}

function updateChildrenList() {
    const list = document.getElementById("children-list");
    list.innerHTML = ""; // リストをクリア

    childrenBirthdates.forEach((child, index) => {
        const formattedDate = `${child.year}年${child.month}月`;
        const li = document.createElement("li");
        li.textContent = `第${index + 1}子: ${formattedDate}`;
        list.appendChild(li);
    });
}

function calculateAllowance() {
    if (childrenBirthdates.length === 0) {
        alert("お子様の生年月を入力してください。");
        return;
    }

    let resultsByYear = {};
    let totalAmount = 0;

    let latestEndYear = Math.max(...childrenBirthdates.map(d => d.year)) + 18;

    for (let year = Math.min(...childrenBirthdates.map(d => d.year)); year <= latestEndYear; year++) {
        let yearTotal = 0;
        let eligibleChildren = childrenBirthdates.filter(d => year >= d.year && year < d.year + 18);
        eligibleChildren.sort((a, b) => a.year - b.year || a.month - b.month);

        eligibleChildren.forEach((child, index) => {
            let age = year - child.year;
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
