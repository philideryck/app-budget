export function Onboarding({onFinish}) {
  return `
    <section class="flex flex-col items-center justify-center h-screen bg-orange-50">
      <h2 class="text-3xl mb-6 text-orange-600 font-bold">Bienvenue sur BudgetMaster Pro 2.0 🚀</h2>
      <ol class="mb-8 text-lg text-gray-700 space-y-2 text-left">
        <li>💸 Suivez vos revenus & dépenses</li>
        <li>📅 Gérez vos transactions récurrentes</li>
        <li>🎯 Contrôlez vos budgets par catégorie</li>
        <li>📈 Visualisez vos tendances financières</li>
        <li>↩️ Profitez d’un système Undo/Redo ultra simple</li>
      </ol>
      <button onclick="(${onFinish})()" class="bg-orange-500 px-6 py-3 text-white rounded text-xl shadow">Démarrer</button>
    </section>
  `;
}
