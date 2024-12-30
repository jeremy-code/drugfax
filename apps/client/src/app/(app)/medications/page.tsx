import Medications from "./medications";

import { fetchMedicationsAction } from "#api/openFda/action";

const MedicationsPage = () => {
  return (
    <main className="container">
      <h1 className="prose-2xl mb-2 font-semibold">Medications</h1>

      <Medications fetchMedicationsAction={fetchMedicationsAction} />
    </main>
  );
};

export default MedicationsPage;
