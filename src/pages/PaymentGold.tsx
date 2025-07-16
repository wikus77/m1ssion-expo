
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CardPaymentForm from "@/components/payments/CardPaymentForm";
import ApplePayBox from "@/components/payments/ApplePayBox";
import GooglePayBox from "@/components/payments/GooglePayBox";
import ClueUnlockedExplosion from "@/components/clues/ClueUnlockedExplosion";
import { useStripePayment } from "@/hooks/useStripePayment";

const PaymentGold = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [showExplosion, setShowExplosion] = useState(false);
  const [fadeOutExplosion, setFadeOutExplosion] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { processSubscription, loading } = useStripePayment();

  const handlePaymentCompleted = () => {
    setShowExplosion(true);
    setFadeOutExplosion(false);

    setTimeout(() => {
      setFadeOutExplosion(true);
      setTimeout(() => {
        setShowExplosion(false);
        setFadeOutExplosion(false);
        toast.success("Abbonamento Gold attivato", {
          description: "Il tuo abbonamento Gold è stato attivato con successo!",
        });
        localStorage.setItem("subscription_plan", "Gold");
        // Forziamo l'aggiornamento della localStorage per attivare l'evento
        window.dispatchEvent(new Event('storage'));
        navigate("/subscriptions");
      }, 1400);
    }, 1700);
  };

  const handleCardSubmit = async () => {
    if (isProcessing || loading) return;
    setIsProcessing(true);
    
    toast.info("Collegamento a Stripe in corso...", {
      description: "Verrai reindirizzato a Stripe per completare il pagamento in modo sicuro.",
      duration: 3000,
    });
    
    try {
      await processSubscription("Gold");
    } catch (error) {
      console.error("Errore durante il processo di pagamento:", error);
      toast.error("Errore di pagamento", {
        description: "Si è verificato un errore durante il processo di pagamento.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplePay = async () => {
    if (isProcessing || loading) return;
    setIsProcessing(true);
    
    toast.success("Pagamento Rapido", {
      description: "Pagamento in elaborazione..."
    });
    
    try {
      await processSubscription("Gold");
    } catch (error) {
      console.error("Errore durante il pagamento rapido:", error);
      toast.error("Errore di pagamento", {
        description: "Si è verificato un errore durante il pagamento rapido.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGooglePay = async () => {
    if (isProcessing || loading) return;
    setIsProcessing(true);
    
    toast.success("Metodo Alternativo", {
      description: "Pagamento in elaborazione..."
    });
    
    try {
      await processSubscription("Gold");
    } catch (error) {
      console.error("Errore durante il pagamento alternativo:", error);
      toast.error("Errore di pagamento", {
        description: "Si è verificato un errore durante il pagamento alternativo.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-6">
      <ClueUnlockedExplosion
        open={showExplosion}
        fadeOut={fadeOutExplosion}
        onFadeOutEnd={() => {}}
      />
      <header className="px-4 py-6 flex items-center border-b border-m1ssion-deep-blue">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Piano Gold - €6,99/mese</h1>
      </header>

      <div className="p-4">
        <div className="glass-card mb-6">
          <div className="flex flex-col gap-4 mb-6">
            <h2 className="text-xl font-semibold">Abbonamento Gold</h2>
            <p className="text-muted-foreground">Con questo piano avrai accesso a:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-m1ssion-blue"></div>
                <span>Tutti i vantaggi Silver</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-m1ssion-blue"></div>
                <span>Indizi illimitati durante l'evento</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-m1ssion-blue"></div>
                <span>Partecipazione alle estrazioni Gold</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-m1ssion-blue"></div>
                <span>Badge Gold nel profilo</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-between mb-6">
            <button 
              className={`flex flex-col items-center justify-center p-4 rounded-md w-1/3 ${paymentMethod === 'card' ? 'bg-m1ssion-deep-blue' : 'bg-gray-800'}`}
              onClick={() => setPaymentMethod('card')}
            >
              <span className="text-sm">Carta</span>
            </button>
            
            <button 
              className={`flex flex-col items-center justify-center p-4 rounded-md w-1/3 ${paymentMethod === 'apple' ? 'bg-m1ssion-deep-blue' : 'bg-gray-800'}`}
              onClick={() => setPaymentMethod('apple')}
            >
              <span className="text-sm">Pagamento Rapido</span>
            </button>
            
            <button 
              className={`flex flex-col items-center justify-center p-4 rounded-md w-1/3 ${paymentMethod === 'google' ? 'bg-m1ssion-deep-blue' : 'bg-gray-800'}`}
              onClick={() => setPaymentMethod('google')}
            >
              <span className="text-sm">Altro metodo</span>
            </button>
          </div>

          {paymentMethod === "card" && (
            <CardPaymentForm onSubmit={handleCardSubmit} />
          )}
          {paymentMethod === "apple" && (
            <ApplePayBox onApplePay={handleApplePay} />
          )}
          {paymentMethod === "google" && (
            <GooglePayBox onGooglePay={handleGooglePay} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGold;
