import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const UniversalContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    userType: "",
    purpose: [],
    message: "",
    studentsOrTeam: "",
    website: "",
    dgcaId: "",
    droneModels: "",
    serviceArea: "",
    pilotCertified: "",
    useCaseDescription: "",
    interestedInDGCA: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (value) => {
    setFormData(prev => {
      const updated = prev.purpose.includes(value)
        ? prev.purpose.filter(item => item !== value)
        : [...prev.purpose, value];
      return { ...prev, purpose: updated };
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const token = sessionStorage.getItem("auth_token");

  if (!token) {
    toast({
      title: "Authentication Required",
      description: "Please log in before submitting the form.",
      variant: "destructive"
    });
    setIsLoading(false);
    return;
  }

  try {
    // 🔶 Primary backend API call
    const response = await fetch("https://34-47-194-149.nip.io/api/inquiry/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        full_name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        organization: formData.organization,
        i_am: formData.userType,
        purpose_of_contact: formData.purpose.join(", "),
        message: formData.message,
        students_or_team: formData.studentsOrTeam,
        website: formData.website,
        dgca_id: formData.dgcaId,
        drone_models: formData.droneModels,
        service_area: formData.serviceArea,
        pilot_certified: formData.pilotCertified,
        use_case_description: formData.useCaseDescription,
        interested_in_dgca: formData.interestedInDGCA
      })
    });

    if (response.ok) {
      // ✅ NeoDove API call (after backend success)
      const neoPayload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        organization: formData.organization,
        userType: formData.userType,
        purpose: formData.purpose.join(", "),
        message: formData.message,
        studentsOrTeam: formData.studentsOrTeam,
        website: formData.website,
        dgcaId: formData.dgcaId,
        droneModels: formData.droneModels,
        serviceArea: formData.serviceArea,
        pilotCertified: formData.pilotCertified,
        useCaseDescription: formData.useCaseDescription,
        interestedInDGCA: formData.interestedInDGCA ? "Yes" : "No",
        submittedAt: new Date().toISOString(),
        status: "New Inquiry"
      };

      try {
        const neoRes = await fetch("https://8f21b23d-d474-422c-89b2-868a67b07e89.neodove.com/integration/custom/0e4195c8-c4fd-42bd-8fc5-9b8494ebd6f6/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(neoPayload)
        });

        const neoResText = await neoRes.text();
        console.log("NeoDove Response:", neoResText);

        if (!neoRes.ok) {
          throw new Error("NeoDove API failed: " + neoResText);
        }
      } catch (neoError) {
        console.error("NeoDove API Error:", neoError);
      }

      // ✅ Success toast and reset
      toast({
        title: "Submission Successful!",
        description: "Thank you. Our team will contact you shortly."
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        userType: "",
        purpose: [],
        message: "",
        studentsOrTeam: "",
        website: "",
        dgcaId: "",
        droneModels: "",
        serviceArea: "",
        pilotCertified: "",
        useCaseDescription: "",
        interestedInDGCA: false
      });
    } else {
      const error = await response.json();
      toast({
        title: "Submission Failed",
        description: error?.detail || error?.message || "Please try again later.",
        variant: "destructive"
      });
    }
  } catch (error) {
    console.error("API Error:", error);
    toast({
      title: "Error",
      description: "There was a problem submitting your inquiry.",
      variant: "destructive"
    });
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <main className="flex justify-center items-center px-4 pt-32 pb-16">
        <Card className="w-full max-w-5xl flex flex-col sm:flex-row shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300">
          {/* Contact Form on Left */}
          <CardContent className="w-full sm:w-1/2 bg-white p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Connect With Us</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" type="text" required value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="John" />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" required value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="john@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="text" required value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder="+91 98765 43210" />
              </div>
              <div>
                <Label htmlFor="organization">Organization / Institution Name *</Label>
                <Input id="organization" type="text" required value={formData.organization} onChange={(e) => handleInputChange("organization", e.target.value)} placeholder="Institute of Technology" />
              </div>
              <div>
                <Label htmlFor="userType">I am a... <span className="text-red-500">*</span></Label>
                <select
                  id="userType"
                  required
                  value={formData.userType}
                  onChange={(e) => handleInputChange("userType", e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-black rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select</option>
                  <option value="Institution">Educational Institution</option>
                  <option value="University">University / Research Center</option>
                  <option value="RPTO">Drone Training Academy (RPTO)</option>
                  <option value="Pilot">Business Consultant / Reseller</option>
                  <option value="ServiceProvider">Drone Service Provider / Pilot</option>
                  <option value="Manufacturer">Drone Manufacturer</option>
                  <option value="Corporate">Corporate / Government</option>
                  <option value="Student">Student</option>
                </select>
              </div>
              <div>
                <Label>Purpose of Contact *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Purchase Simulator", "Request a Demo", "Integrate in Curriculum", "Add Drone Model/ Scenario", "Use for Research", "Train My Team", "Collaborate / Resell"].map((item, idx) => (
                    <label key={idx} className="flex items-center space-x-2 px-2 py-2 border rounded-md hover:bg-gray-50">
                      <input type="checkbox" checked={formData.purpose.includes(item)} onChange={() => handleCheckboxChange(item)} className="form-checkbox h-4 w-4 text-orange-600" />
                      <span className="text-sm text-gray-800">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              {formData.userType === "Pilot" && (
                <div>
                  <Label>Pilot Certification Status</Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="certified" value="Yes" checked={formData.pilotCertified === "Yes"} onChange={(e) => handleInputChange("pilotCertified", e.target.value)} className="mr-2" /> Yes
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="certified" value="No" checked={formData.pilotCertified === "No"} onChange={(e) => handleInputChange("pilotCertified", e.target.value)} className="mr-2" /> No
                    </label>
                  </div>
                </div>
              )}
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Let us know more about your inquiry or requirements"
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 text-md" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </CardContent>

          {/* Image on Right */}
          <div className="w-full sm:w-1/2">
            <img src="/images/contact.png" alt="Students" className="w-full h-full object-cover" />
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default UniversalContactForm;
