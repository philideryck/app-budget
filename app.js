import { Dashboard } from './components/Dashboard.js';
import { Transactions } from './components/Transactions.js';
import { Budgets } from './components/Budgets.js';
import { Recurrents } from './components/Recurrents.js';
import { Onboarding } from './components/Onboarding.js';
import { UndoRedo } from './components/UndoRedo.js';

const appState = {
  page: 'dashboard',
  onboardingDone: false,
  ...JSON.parse(localStorage.getItem('budgetmaster_data') || '{}')
};
export let appData = {
  transactions: [],
  budgets: [],
  recurrents: [],
  ...appState
};

export function setAppData(newData, recordHistory = true) {
  Object.assign(appData, newData);
  if (recordHistory) UndoRedo.pushHistory(appData);
  localStorage.setItem('budgetmaster_data', JSON.stringify(appData));
  renderApp();
}

function renderApp() {
  const app = document.getElementById('app');
  if (!appData.onboardingDone) {
    app.innerHTML = Onboarding({ onFinish: () => {
      appData.onboardingDone = true;
      setAppData({ onboardingDone: true });
    } });
    return;
  }

  app.innerHTML = `
    <nav class="flex justify-between p-4 bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-10">
      <div class="font-bold text-2xl text-orange-600">💰 BudgetMaster Pro</div>
      <div class="flex gap-2 items-center">
        <button onclick="window.setPage('dashboard')" class="nav-btn ${appData.page==='dashboard'?'bg-orange-100 dark:bg-gray-800':''}">Dashboard</button>
        <button onclick="window.setPage('transactions')" class="nav-btn ${appData.page==='transactions'?'bg-orange-100 dark:bg-gray-800':''}">Transactions</button>
        <button onclick="window.setPage('budgets')" class="nav-btn ${appData.page==='budgets'?'bg-orange-100 dark:bg-gray-800':''}">Budgets</button>
        <button onclick="window.setPage('recurrents')" class="nav-btn ${appData.page==='recurrents'?'bg-orange-100 dark:bg-gray-800':''}">Récurrents</button>
        <button onclick="window.toggleDarkMode()" class="ml-3">${window.matchMedia('(prefers-color-scheme: dark)').matches ? '🌙' : '🌞'}</button>
        <button onclick="UndoRedo.undo()" title="Annuler (Ctrl+Z)">↩️</button>
        <button onclick="UndoRedo.redo()" title="Rétablir (Ctrl+Y)">↪️</button>
      </div>
    </nav>
    <main class="max-w-4xl mx-auto my-8">
      ${appData.page==='dashboard' ? Dashboard() : ''}
      ${appData.page==='transactions' ? Transactions() : ''}
      ${appData.page==='budgets' ? Budgets() : ''}
      ${appData.page==='recurrents' ? Recurrents() : ''}
    </main>
  `;
  // drag & drop init
  if (appData.page==='transactions') window.initTransactionsDnD();
}
window.setPage = (page) => { setAppData({ page }); };
window.toggleDarkMode = () => {
  document.body.classList.toggle('dark');
};
// For undo/redo global shortcuts
window.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') UndoRedo.undo();
  if ((e.ctrlKey || e.metaKey) && e.key === 'y') UndoRedo.redo();
});
renderApp();
