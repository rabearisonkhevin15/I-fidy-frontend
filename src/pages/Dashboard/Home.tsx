import CompteARebour from "../../components/dash/CompteARebour";
import NbElecteurs from "../../components/dash/NbElecteurs";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta title="Dashboard" description="dashboard" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Les 2 premiers conteneurs dans NbElecteurs */}
        <div className="lg:col-span-2">
          <NbElecteurs />
        </div>

        {/* Compte à Rebours à droite */}
        <div>
          <CompteARebour />
        </div>
      </div>
    </>
  );
}
