import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function MissionDetails() {
  const { id } = useParams();
  const [mission, setMission] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://goluxtrip-backend.vercel.app/api/real-missions")
      .then(res => res.json())
      .then(data => {
        const found = (Array.isArray(data) ? data : []).find(m => m._id === id);
        setMission(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="pt-10 pb-20 text-center font-bold text-navy">Loading...</div>;
  if (!mission) return <div className="pt-10 pb-20 text-center font-bold text-red-500">Mission not found</div>;

  return (
    <div className="pt-10 pb-20 px-5 max-w-5xl mx-auto min-h-screen">
      <Link to="/real-missions" className="inline-flex items-center gap-2 text-gltOrange font-bold mb-8 hover:underline">
        <ArrowLeft size={16} /> Back to Missions
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 uppercase leading-tight tracking-tight">{mission.title}</h1>
      <p className="text-gltOrange font-bold uppercase tracking-widest mb-10">{mission.date}</p>
      
      <img src={mission.image} alt={mission.title} className="w-full h-auto max-h-[60vh] object-cover rounded-2xl shadow-2xl mb-12" />
      
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12 whitespace-pre-wrap">
        {mission.longDescription || mission.description}
      </div>
      
      {mission.photos && mission.photos.length > 0 && (
        <div>
          <h3 className="text-2xl font-black text-navy uppercase mb-6">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mission.photos.map((photo: string, idx: number) => (
              <img key={idx} src={photo} alt="" className="w-full h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
