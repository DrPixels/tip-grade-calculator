import { useState } from "react";
import "./App.css";

function App() {
  const [midtermGrade, setMidtermGrade] = useState(0);
  const [finalCSGrade, setFinalCSGrade] = useState(0);
  const [gradeNeededMatrix, setGradeNeededMatrix] = useState(null);
  const [itemsNum, setItemsNum] = useState(50);

  //For computing the maximum grade achievable
  const [maxGradeAch, setMaxGradeAch] = useState(0);
  const [maxGradeNeeded, setMaxGradeNeeded] = useState(0);
  const handleComputeGradeNeeded = (e, targetGrade) => {
    e.preventDefault();

    computeGradeNeedMatrix();
    computeMaximumGrade();
  };

  const computeExamItemsNeeded = (percentage) => {
    return Math.ceil((percentage / 100) * itemsNum) > itemsNum ? itemsNum : Math.ceil((percentage / 100) * itemsNum);
  };

  const computeGradeNeeded = (targetGrade) => {
    return 3 * targetGrade - midtermGrade - finalCSGrade;
  };

  const computeMaximumGrade = () => {
    if (midtermGrade > 100 || midtermGrade < 0 || finalCSGrade > 100 || finalCSGrade < 0) return;
    const value = (100 + Number(midtermGrade) + Number(finalCSGrade)) / 3;
    setMaxGradeAch(value);

    const maxGradeNeeded = 3 * value - midtermGrade - finalCSGrade;
    setMaxGradeNeeded(maxGradeNeeded);
  };

  const computeGradeNeedMatrix = () => {
    const computedGradeMatrix = {
      g1: {
        point: "1.00",
        min: 0,
        max: 0,
      },
      "g1.25": {
        point: "1.25",
        min: 0,
        max: 0,
      },
      "g1.50": {
        point: "1.50",
        min: 0,
        max: 0,
      },
      "g1.75": {
        point: "1.75",
        min: 0,
        max: 0,
      },
      g2: {
        point: "2.00",
        min: 0,
        max: 0,
      },
      "g2.25": {
        point: "2.25",
        min: 0,
        max: 0,
      },
      "g2.50": {
        point: "2.50",
        min: 0,
        max: 0,
      },
      "g2.75": {
        point: "2.75",
        min: 0,
        max: 0,
      },
      g3: {
        point: "3.00",
        min: 0,
        max: 0,
      },
    };

    for (let key in computedGradeMatrix) {
      // Getting the min and max
      const minGrade = gradeMatrix[key]["min"];
      const maxGrade = gradeMatrix[key]["max"];

      computedGradeMatrix[key]["min"] = computeGradeNeeded(minGrade);
      computedGradeMatrix[key]["max"] = computeGradeNeeded(maxGrade);
    }

    setGradeNeededMatrix(computedGradeMatrix);
  };

  const gradeMatrix = {
    g1: {
      point: "1.00",
      min: 94,
      max: 100,
    },
    "g1.25": {
      point: "1.25",
      min: 88.5,
      max: 93.99,
    },
    "g1.50": {
      point: "1.50",
      min: 83,
      max: 88.49,
    },
    "g1.75": {
      point: "1.75",
      min: 77.5,
      max: 82.99,
    },
    g2: {
      point: "2.00",
      min: 72,
      max: 77.49,
    },
    "g2.25": {
      point: "2.25",
      min: 65.5,
      max: 71.99,
    },
    "g2.50": {
      point: "2.50",
      min: 61,
      max: 65.49,
    },
    "g2.75": {
      point: "2.75",
      min: 55.5,
      max: 60.99,
    },
    g3: {
      point: "3.00",
      min: 50,
      max: 55.49,
    },
  };

  return (
    <>
      <div className="max-w-3xl mx-auto bg-base-200 mt-4 pb-1 rounded-lg">
        <form onSubmit={(e) => handleComputeGradeNeeded(e, 50)}>
          <div>
            <div className="mb-2 bg-base-300 p-4 rounded-lg flex flex-col gap-2">
              <div>
                <h2 className="text-3xl font-bold">Grade Calculator</h2>
                <p className="text-xs italic font-bold text-pink-300">created with code & care — lindtsey</p>
              </div>

              <p>
                Enter your grades to calculate the score you need on the final examination to achieve your desired grade
                point
              </p>
              <div className="px-2 py-2 rounded-sm bg-base-100">
                <p className="text-sm font-bold">
                  --- <span className="font-normal">indicates that the grade is not achievable.</span>
                </p>
                <p className="text-sm font-bold">
                  MGP <span className="font-normal">stands for Maximum Grade Percentage achievable.</span>
                </p>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 mb-2">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-bold">Enter Midterm Grade:</label>
                  <input
                    className="input "
                    value={midtermGrade}
                    onChange={(e) => setMidtermGrade(e.target.value)}
                    min={0}
                    max={100}
                    type="number"
                    step="0.01"
                    required
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-bold">Enter Final Class Standing:</label>
                  <input
                    className="input"
                    value={finalCSGrade}
                    onChange={(e) => setFinalCSGrade(e.target.value)}
                    min={0}
                    max={100}
                    type="number"
                    step="0.01"
                    required
                  ></input>
                </div>
              </div>

              <div>
                <button type="submit" className="btn btn-primary w-50">
                  Compute Grade
                </button>
              </div>
            </div>
          </div>
        </form>

        {gradeNeededMatrix && gradeNeededMatrix["g3"]["min"].toFixed(2) < 100 && (
          <div className="flex flex-col pl-4 gap-1 mb-4">
            <label>Number of Exams Items: {itemsNum}</label>
            <input
              type="range"
              min={1}
              max="100"
              value={itemsNum}
              onChange={(e) => setItemsNum(e.target.value)}
              step="1"
              className="range range-accent"
            />
          </div>
        )}

        {gradeNeededMatrix && (
          <div className="font-bold pl-4">
            {gradeNeededMatrix["g3"]["min"].toFixed(2) < 0 ? (
              <p>You’ve already passed the course, regardless of your score on the Final Examination.</p>
            ) : gradeNeededMatrix["g3"]["min"].toFixed(2) < 100 ? (
              <p>
                You must achieve a minimum of{" "}
                <span className="font-bold">
                  {gradeNeededMatrix["g3"]["min"].toFixed(2)}% or{" "}
                  {computeExamItemsNeeded(gradeNeededMatrix["g3"]["min"])}
                  {computeExamItemsNeeded(gradeNeededMatrix["g3"]["min"]) > 1 ? "correct answers" : "correct answer"}
                </span>
                &nbsp;in the Final Examination to pass this course.
              </p>
            ) : (
              <p className="text-red-500">
                You’ve already failed the course, regardless of your score on the Final Examination.
              </p>
            )}
          </div>
        )}

        {gradeNeededMatrix && gradeNeededMatrix["g3"]["min"].toFixed(2) < 100 && (
          <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 m-4 px-4 pb-2">
            <table className="table ">
              <tr>
                <th>Grade Point</th>
                <th>Grade Percentage</th>
                <th>Minimum</th>
                <th>Maximum</th>
              </tr>
              {Object.keys(gradeNeededMatrix).map((key) => (
                <tr className="hover:bg-base-300 border-b border-base-300" key={key}>
                  <td>{gradeNeededMatrix[key]["point"]}</td>
                  <td>{`${gradeMatrix[key]["min"]} - ${gradeMatrix[key]["max"]}`}</td>
                  <td>
                    {gradeNeededMatrix[key]["min"] > 100 ? (
                      <p className="text-red-600 font-bold">---</p>
                    ) : gradeNeededMatrix[key]["min"] < 0 ? (
                      <p className="font-bold">0.00%</p>
                    ) : (
                      <p className="font-bold">
                        {gradeNeededMatrix[key]["min"].toFixed(2)}%<br />
                        <span className="text-xs font-medium">
                          {computeExamItemsNeeded(gradeNeededMatrix[key]["min"].toFixed(2))} items
                        </span>
                      </p>
                    )}
                  </td>
                  <td>
                    {gradeNeededMatrix[key]["min"] > 100 ? (
                      <p className="text-red-600 font-bold">---</p>
                    ) : gradeNeededMatrix[key]["max"] > 100 ? (
                      <p className="font-bold">
                        {maxGradeNeeded?.toFixed(2)}%<br />
                        <span className="italic text-sm">
                          {maxGradeAch?.toFixed(2)} (MGP)
                          <br />
                          <span className="text-xs  font-medium">{computeExamItemsNeeded(maxGradeNeeded)} items</span>
                        </span>
                      </p>
                    ) : gradeNeededMatrix[key]["max"] > 0 ? (
                      <p className="font-bold">
                        {gradeNeededMatrix[key]["max"].toFixed(2)}%<br />
                        <span className="text-xs font-medium">
                          {computeExamItemsNeeded(gradeNeededMatrix[key]["max"].toFixed(2))}{" "}
                          {computeExamItemsNeeded(gradeNeededMatrix[key]["max"].toFixed(2)) > 1 ? "items" : "item"}
                        </span>
                      </p>
                    ) : (
                      <p className="font-bold">0.00%</p>
                    )}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
