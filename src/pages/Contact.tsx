import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type ContactMessage = {
  id?: number;
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: "",
    email: "",
    message: ""
  });
  const [userMessages, setUserMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin] = useState(true); // Make dynamic if needed
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const token = sessionStorage.getItem("auth_token");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserMessages();
  }, []);

  const fetchUserMessages = async () => {
    if (!token) return;

    try {
      const res = await fetch("https://34-47-194-149.nip.io/api/contact/my/", {
        headers: { Authorization: `Token ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUserMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Please log in before submitting the form.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://34-47-194-149.nip.io/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Message Sent!",
          description: `Hi ${data.name}, your message has been submitted.`
        });
        setFormData({ name: "", email: "", message: "" });
        fetchUserMessages();
      } else {
        const error = await response.json();
        toast({
          title: "Submission Failed",
          description: error?.detail || error?.message || "Something went wrong.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Error",
        description: "There was an issue sending your message.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token || !isAdmin) return;

    try {
      const res = await fetch(`https://34-47-194-149.nip.io/api/contact/admin/${id}/delete/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` }
      });

      if (res.ok) {
        toast({ title: "Deleted", description: "Message deleted successfully." });
        fetchUserMessages();
      } else {
        toast({
          title: "Delete Failed",
          description: "You may not have permission to delete this message.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white font-poppins">
      <Navigation />
      <main className="flex-grow px-4 pt-32 pb-16">
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          <Card className="w-full shadow-xl border border-gray-200 animate-fade-in">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us how we can help you..."
                    className="min-h-[120px]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Your messages */}
          {userMessages.length > 0 && (
            <div className="mt-12 w-full">
              <h3 className="text-xl font-semibold mb-4">Your Messages</h3>
              <ul className="space-y-4">
                {userMessages.map((msg) => (
                  <li key={msg.id} className="border p-4 rounded shadow-sm flex justify-between items-start">
                    <div>
                      <p><strong>Name:</strong> {msg.name}</p>
                      <p><strong>Email:</strong> {msg.email}</p>
                      <p><strong>Message:</strong> {msg.message}</p>
                    </div>
                    {isAdmin && msg.id && (
                      <Button variant="destructive" onClick={() => handleDelete(msg.id)}>
                        Delete
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
