let childrenBirthdates = [];

function addChild() {
    const dateInput = document.getElementById("childBirthdate");
    const birthdateStr = dateInput.value;

    if (!birthdateStr) {
        alert("生年月日を入力してください。");
        return;
    }

    const birthdate = new Date(birthdateStr);
    childrenBirthdates.push(birthdate);
    childrenBirthdates.sort((a, b) => a - b); // 生年月日順に並べる
    updateChildrenList();
    dateInput.value = ""; // 入力欄をクリア
}

function updateChildrenList() {
    const list = document.getElementById("children-list");
    list.innerHTML = ""; // リストをリセット

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
           
