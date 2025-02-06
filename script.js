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
        let year = child.year;
        let month = child.month;
        let age = 0;

        while (age < 18) {
            // 支給終了年（18歳の3月まで）
            const endYear = child.year + 18;
            if (year >= endYear && month > 3) break;

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
            if (!results[year]) results[year] = 0;
            results[year] += monthlyAllowance;

            // 次の月へ
            month++;
            if (month > 12) {
                month = 1;
                year++;
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
