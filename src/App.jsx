import React, { useState } from 'react';
import ElementTransfer from './ElementTransfer/BucketTransfer';
import NestedList from './NestedList/FileExplorer';
import InfiniteScroll from'./InfiniteScroll/InfiniteScroll';
import HitGame from './HitGame/Game';
import BoxSplit from './BoxSplit/BoxSplit'
import './App.css'

function App() {
  const [activeProblem, setActiveProblem] = useState(1);

  return (
    <div>
      {/* <h1>ReactJS Assignment</h1> */}
      <nav>
        {[1, 2, 3, 4, 5].map((num) => (
          <button key={num} onClick={() => setActiveProblem(num)}>
            Problem {num}
          </button>
        ))}
      </nav>
      <div>
        {activeProblem === 1 && <ElementTransfer />}
        {activeProblem === 2 && <NestedList />}
        {activeProblem === 3 && <InfiniteScroll />}
        {activeProblem === 4 && <HitGame />}
        {activeProblem === 5 && <BoxSplit />}
      </div>
    </div>
  );
}

export default App;
