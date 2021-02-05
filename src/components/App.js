import Route from './Route';
import GlobalStyles from './GlobalStyles';
function App() {
  // 함수 최초 설정
  Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}
  return (
    <div className="App">
      <GlobalStyles />
     <Route />
    </div>
  );
}

export default App;
