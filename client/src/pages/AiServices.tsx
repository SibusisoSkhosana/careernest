import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Mail, Search, CreditCard, CheckCircle, Clock, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";

interface AiService {
  id: number;
  name: string;
  description: string;
  price: string;
  currency: string;
  serviceType: string;
  isActive: boolean;
}

interface UserService {
  id: number;
  serviceName: string;
  serviceType: string;
  status: string;
  usageCount: number;
  maxUsage: number;
  expiresAt: string;
  createdAt: string;
}

const AiServices = () => {
  const [services, setServices] = useState<AiService[]>([]);
  const [userServices, setUserServices] = useState<UserService[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<number | null>(null);
  const { t, formatPrice, getMoMoProvider } = useTranslation();

  useEffect(() => {
    fetchServices();
    fetchUserServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/ai-services');
      const data = await response.json();
      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to load AI services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserServices = async () => {
    try {
      const response = await fetch('/api/ai-services/my-services');
      const data = await response.json();
      if (data.success) {
        setUserServices(data.services);
      }
    } catch (error) {
      console.error('Error fetching user services:', error);
    }
  };

  const hasActiveService = (serviceType: string) => {
    return userServices.some(service => 
      service.serviceType === serviceType && 
      service.status === 'completed' &&
      new Date(service.expiresAt) > new Date()
    );
  };

  const purchaseService = async (serviceId: number, phoneNumber: string) => {
    setPurchasing(serviceId);
    try {
      const response = await fetch('/api/ai-services/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          phoneNumber
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Payment Initiated",
          description: data.message,
        });
        
        // Poll for payment status
        pollPaymentStatus(data.transactionId);
      } else {
        toast({
          title: "Payment Failed",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error purchasing service:', error);
      toast({
        title: "Error",
        description: "Failed to initiate payment",
        variant: "destructive",
      });
    } finally {
      setPurchasing(null);
    }
  };

  const pollPaymentStatus = async (transactionId: string) => {
    const maxAttempts = 30; // 5 minutes
    let attempts = 0;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/ai-services/verify-payment/${transactionId}`, {
          method: 'POST',
        });
        const data = await response.json();

        if (data.success) {
          toast({
            title: "Payment Successful",
            description: data.message,
          });
          fetchUserServices(); // Refresh user services
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 10000); // Check every 10 seconds
        } else {
          toast({
            title: "Payment Status Unknown",
            description: "Please check your payment status manually",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    setTimeout(checkStatus, 5000); // Start checking after 5 seconds
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'cv_generation':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'cover_letter':
        return <Mail className="h-8 w-8 text-green-500" />;
      case 'job_alerts':
        return <Search className="h-8 w-8 text-purple-500" />;
      default:
        return <Zap className="h-8 w-8 text-orange-500" />;
    }
  };

  const getServiceFeatures = (serviceType: string) => {
    switch (serviceType) {
      case 'cv_generation':
        return [
          "AI-powered content optimization",
          "Professional templates",
          "ATS-friendly formatting",
          "Skills highlighting",
          "Achievement focus",
          "Industry-specific customization"
        ];
      case 'cover_letter':
        return [
          "Personalized for each job",
          "Company research integration",
          "Skills matching",
          "Professional tone",
          "Compelling storytelling",
          "Multiple format options"
        ];
      case 'job_alerts':
        return [
          "AI-curated job matching",
          "Daily email notifications",
          "Salary range filtering",
          "Location preferences",
          "Industry-specific alerts",
          "30-day subscription"
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI-Powered Career Services</h1>
          <p className="text-muted-foreground">
            Boost your career with our AI-powered tools. Generate professional CVs, cover letters, and get personalized job alerts.
          </p>
        </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="services">Available Services</TabsTrigger>
          <TabsTrigger value="my-services">My Services</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="relative overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    {getServiceIcon(service.serviceType)}
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-lg font-bold">
                          {formatPrice(service.price)}
                        </Badge>
                        {hasActiveService(service.serviceType) && (
                          <Badge variant="default" className="bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {getServiceFeatures(service.serviceType).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {hasActiveService(service.serviceType) ? (
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => {
                        // Navigate to the specific service
                        if (service.serviceType === 'cv_generation') {
                          window.location.href = '/cv-generator';
                        } else if (service.serviceType === 'cover_letter') {
                          window.location.href = '/cover-letter-generator';
                        } else if (service.serviceType === 'job_alerts') {
                          window.location.href = '/job-search';
                        }
                      }}
                    >
                      Use Service
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        const phoneNumber = prompt("Enter your MTN MoMo phone number:");
                        if (phoneNumber) {
                          purchaseService(service.id, phoneNumber);
                        }
                      }}
                      disabled={purchasing === service.id}
                    >
                      {purchasing === service.id ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay with MoMo
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-services" className="space-y-6">
          {userServices.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Services Yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Purchase AI services to boost your career with professional CVs, cover letters, and job alerts.
                </p>
                <Button onClick={() => document.querySelector('[value="services"]')?.click()}>
                  Browse Services
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {userServices.map((service) => (
                <Card key={service.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      {getServiceIcon(service.serviceType)}
                      <div>
                        <h3 className="font-medium">{service.serviceName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant={service.status === 'completed' ? 'default' : 'secondary'}
                            className={service.status === 'completed' ? 'bg-green-500' : ''}
                          >
                            {service.status === 'completed' ? 'Active' : 'Pending'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Usage: {service.usageCount}/{service.maxUsage}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Expires: {new Date(service.expiresAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Purchased: {new Date(service.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      </div>
    </Layout>
  );
};

export default AiServices;
