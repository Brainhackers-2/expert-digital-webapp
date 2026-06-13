import { Users, ThumbsUp, Star, Award } from 'lucide-react';
import { FadeIn } from '../ui/FadeIn';

export const StatsBar = () => {
  const stats = [
    { id: 1, label: 'Abonnés Facebook', value: '1000+', icon: ThumbsUp },
    { id: 2, label: 'Abonnés LinkedIn', value: '500+', icon: Users },
    { id: 3, label: 'Avis Clients', value: '29', icon: Star },
    { id: 4, label: 'Recommandation', value: '100%', icon: Award },
  ];

  return (
    <div className="relative -mt-16 z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <FadeIn key={stat.id} delay={0.1 * index} className="text-center px-4 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-light flex items-center justify-center text-secondary mb-4">
                    <Icon size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-primary mb-2 tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};