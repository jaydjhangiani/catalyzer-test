import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Leaf, Cpu } from "lucide-react";

const InnovationTypes = () => {
  const types = [
    {
      icon: <Network className="w-12 h-12 text-white" />,
      title: "Pattern",
      bg: "bg-gradient-card"
    },
    {
      icon: <Leaf className="w-12 h-12 text-white" />,
      title: "Sustainability", 
      bg: "bg-gradient-card"
    },
    {
      icon: <Cpu className="w-12 h-12 text-white" />,
      title: "Technology",
      bg: "bg-gradient-card"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-4 tracking-wider uppercase">INNOVATION TYPES</p>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-brand-lime">Innovation Type</span>
            <br />
            Examples
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto mb-12">
          {types.map((type, index) => (
            <Card key={index} className={`${type.bg} p-8 border-none text-white hover:shadow-glow transition-all duration-300 transform hover:scale-105 text-center min-w-[200px]`}>
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  {type.icon}
                </div>
                <h3 className="text-2xl font-bold">{type.title}</h3>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
          </div>
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            Explore all 64
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InnovationTypes;