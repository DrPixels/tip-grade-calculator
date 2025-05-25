import { useState } from "react";
import "./App.css";

function App() {
  const [midtermGrade, setMidtermGrade] = useState(0);
  const [finalCSGrade, setFinalCSGrade] = useState(0);
  const [gradeNeededMatrix, setGradeNeededMatrix] = useState(null);
  const handleComputeGradeNeeded = (e, targetGrade) => {
    e.preventDefault();

    computeGradeNeedMatrix();
  };

  const computeGradeNeeded = (targetGrade) => {
    return 3 * targetGrade - midtermGrade - finalCSGrade;
  };

  const computeMaximumGrade = () => {
    console.log(midtermGrade);
    console.log(finalCSGrade);
    return (100 + Number(midtermGrade) + Number(finalCSGrade)) / 3;
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
      const gradeText = key.slice(1);
      console.log(`${gradeText}: ${computedGradeMatrix[key]["min"]} - ${computedGradeMatrix[key]["max"]}`);
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
            <div className="mb-8 bg-base-300 p-4 rounded-lg flex flex-col gap-2">
              <h2 className="text-3xl font-bold">Grade Calculator</h2>
              <p>
                Enter your grades to calculate the score you need on the final examination to achieve your desired grade
                point
              </p>
              <p className="text-xs italic font-bold">created with code & care — lindtsey</p>
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

        {gradeNeededMatrix && (
          <div className="font-bold pl-4">
            {gradeNeededMatrix["g3"]["min"].toFixed(2) < 0 ? (
              <p>You’ve already passed the course, regardless of your score on the Final Examination.</p>
            ) : gradeNeededMatrix["g3"]["min"].toFixed(2) < 100 ? (
              <p>
                You must achieve a minimum of{" "}
                <span className="font-bold">{gradeNeededMatrix["g3"]["min"].toFixed(2)}%</span>
                &nbsp;in the Final Examination to pass this course.
              </p>
            ) : (
              <p>You’ve already failed the course, regardless of your score on the Final Examination.</p>
            )}
          </div>
        )}

        {gradeNeededMatrix && gradeNeededMatrix["g3"]["min"].toFixed(2) < 100 && (
          <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 m-4 px-4">
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
                    {gradeNeededMatrix[key]["min"] > 100
                      ? "---"
                      : gradeNeededMatrix[key]["min"] < 0
                      ? `${0.0}%`
                      : `${gradeNeededMatrix[key]["min"].toFixed(2)}%`}
                  </td>
                  <td>
                    {gradeNeededMatrix[key]["min"] > 100 ? (
                      "---"
                    ) : gradeNeededMatrix[key]["max"] > 100 ? (
                      <p>
                        {computeGradeNeeded(computeMaximumGrade()).toFixed(2)}%<br />
                        <span className="italic text-sm">
                          {computeMaximumGrade().toFixed(2)} (Max Grade Percentage)
                        </span>
                      </p>
                    ) : gradeNeededMatrix[key]["max"] > 0 ? (
                      `${gradeNeededMatrix[key]["max"].toFixed(2)}%`
                    ) : (
                      `${0.0}%`
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
