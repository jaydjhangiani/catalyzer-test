import { Card } from '@/components/ui/card';
import { Lightbulb, Brain, UserCog, WandSparkles } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Lightbulb className="w-24 h-24 text-white" />,
      title: 'Corporate Workshops',
      description:
        'Trains corporate teams to be comfortable using GenAI in a fun, intuitive, systematic way to support many activities related to idea generation & new product development',
      bg: 'bg-gradient-card',
    },
    {
      icon: <UserCog className="w-24 h-24 text-white" />,
      title: 'Individual Subscriptions',
      description:
        'Whether you’re a freelancer or student in engineering, product design, fashion design, or entrepreneurship, Catalyzer can support creative work for a wide range of projects & presentations',
      bg: 'bg-gradient-card',
    },
    {
      icon: <WandSparkles className="w-24 h-24 text-white" />,
      title: 'Innovation As A Service',
      description:
        'Tell us your new product objectives & we’ll develop a range of new product concepts ready to test, complete with visuals, descriptions, packaging, pricing naming, & advertising taglines',
      bg: 'bg-gradient-card',
    },
    {
      icon: <Brain className="w-24 h-24 text-white" />,
      title: 'Licenses For Corporations & Universities',
      description:
        'For large numbers of individuals in an organization. Licenses come with employee training workshops to get users off to a great start maximizing use cases & the tool’s full potential',
      bg: 'bg-gradient-card',
    },
  ];

  return (
    <section
      id="features"
      className="lg:min-h-screen py-24 bg-background"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            How You Can Engage With The Catalyzer<sup>®</sup>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-[90%] max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`${feature.bg} p-6 md:p-8 border-none text-white hover:shadow-glow transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
                <div className="flex-shrink-0 w-32 h-32 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Catalyzer<sup>®</sup> workshops teach new product development
            methods
            <br />
            used by the most successful companies globally
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
