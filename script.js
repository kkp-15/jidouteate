let childrenBirthdates = [];

/**
 * 🏷️ 【関数】addChild()
 * 子どもの生年月日を入力してリストに追加
 */
function addChild() {
    const year = parseInt(document.getElementById("child-year").value);
    const month = parseInt(document.getElementById("child-month").value);

    // 年と月が入力されているか確認
    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        alert("正しい年月を入力してください");
        return;
    }

    // CSV形式で保存（年,月）
    const childData = `${year},${month}`;

    // 子どもの生年月日をリストに追加
    childrenBirthdates.push({ csv: childData });

    // 入力した子どもの情報を表示
    displayChildren();

    // 入力欄をリセット
    document.getElementById("child-year").value = "";
    document.getElementById("child-month").value = "";
}

/**
 * 🏷️ 【関数】displayChildren()
 * 入力した子どもたちの情報をリストに表示（CSV形式）
 */
function displayChildren() {
    const childrenListDiv = document.getElementById("children-list");
    childrenListDiv.innerHTML = "";

    childrenBirthdates.forEach((child, index) => {
        const p = document.createElement("p");
        p.textContent = `第${index + 1}子: ${child.csv}`;
        childrenListDiv.appendChild(p);
    });
}

/**
 * 🏷️ 【関数】calculateAllowance()
 * 児童手当の支給額を計算し、年ごとに表示する（2024年改正対応）
 */
function calculateAllowance() {
    if (childrenBirthdates.length === 0) {
        alert("子どもの生年月を追加してください。");
        return;
    }

    const results = {}; // 各年ごとの支給額を格納

    childrenBirthdates.forEach((child, index) => {
        const [year, month] = child.csv.split(',').map(Number);
        let age = 0;

        let currentYear = year;
        let currentMonth = month;

        while (age < 18) {
            // 支給終了年（18歳の3月まで）
            const endYear = year + 18;
            if (currentYear >= endYear && currentMonth > 3) break;

            // 支給額の判定
            let monthlyAllowance = 0;
            if (age < 3) {
                monthlyAllowance = 15000; // 0歳～3歳未満
            } else if (age < 12) {
                monthlyAllowance = index >= 2 ? 15000 : 10000; // 3歳～小学校修了前
            } else {
                monthlyAllowance = 10000; // 中学生・高校生（18歳まで）
            }

            // 年ごとの支給額に加算
            if (!results[currentYear]) results[currentYear] = 0;
            results[currentYear] += monthlyAllowance;

            // 次の月へ
            currentMonth++;
            if (currentMonth > 12) {
                currentMonth = 1;
                currentYear++;
                age++;
            }
        }
    });

    // 結果を表示
    displayResults(results);
}

/**
 * 🏷️ 【関数】displayResults()
 * 計算結果を画面に表示する
 */
function displayResults(results) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // クリア

    let totalSum = 0;
    Object.keys(results).sort().forEach(year => {
        const amount = results[year] * 12; // 年間支給額
        totalSum += amount;

        const p = document.createElement("p");
        p.textContent = `${year}年: ${amount.toLocaleString()}円`;
        resultDiv.appendChild(p);
    });

    // 合計支給額を表示
    const totalP = document.createElement("p");
    totalP.textContent = `総支給額: ${totalSum.toLocaleString()}円`;
    totalP.style.fontWeight = "bold";
    resultDiv.appendChild(totalP);
}

/**
 * 🏷️ 【関数】イベントリスナー設定
 * 追加ボタンがクリックされたときに addChild 関数が呼ばれるように設定
 */
document.getElementById("add-child-btn").addEventListener("click", addChild);
