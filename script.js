let childrenBirthYears = [];

function addChild() {
    const yearInput = document.getElementById("childYear");
    const birthYear = parseInt(yearInput.value);

    if (isNaN(birthYear) || birthYear < 2000 || birthYear > new Date().getFullYear()) {
        alert("有効な西暦を入力してください。（2000年以降）");
        return;
    }

    childrenBirthYears.push(birthYear);
    childrenBirthYears.sort(); // 年齢順に並べる
    updateChildrenList();
    yearInput.value = "";
}

function updateChildrenList() {
    const list = document.getElementById("children-list");
    list.innerHTML = "";
    childrenBirthYears.forEach((year, index) => {
        const li = document.createElement("li");
        li.textContent = `第${index + 1}子: ${year}年生まれ`;
        list.appendChild(li);
    });
}

function calculateAllowance() {
    if (childrenBirthYears.length === 0) {
        alert("お子様の生年月日を入力してください。");
        return;
    }

    let resultsByYear = {};
    let totalAmount = 0;
    let endYear = Math.max(...childrenBirthYears) + 19; // 一番下の子の18歳3月まで

    for (let year = Math.min(...childrenBirthYears); year < endYear; year++) {
        let eligibleChildren = childrenBirthYears.filter(b => year >= b && year < b + 19);
        eligibleChildren.sort(); // 年齢順に並べる
        let yearTotal = 0;

        eligibleChildren.forEach((birthYear, index) => {
            let age = year - birthYear;
            let amount = 0;

            if (age < 3) {
                amount = 15000; // 0～2歳
            } else if (age < 12) {
                amount = (index >= 2) ? 15000 : 10000; // 第3子以降は増額
            } else if (age < 15) {
                amount = 10000; // 中学生
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
