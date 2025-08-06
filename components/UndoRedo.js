import { appData, setAppData } from '../app.js';
const history = [JSON.stringify(appData)];
let cursor = 0;
export const UndoRedo = {
  pushHistory(data) {
    history.splice(cursor+1); // drop redo
    history.push(JSON.stringify(data));
    cursor = history.length - 1;
  },
  undo() {
    if (cursor <= 0) return;
    cursor--;
    setAppData(JSON.parse(history[cursor]), false);
  },
  redo() {
    if (cursor >= history.length-1) return;
    cursor++;
    setAppData(JSON.parse(history[cursor]), false);
  }
};
window.UndoRedo = UndoRedo;
