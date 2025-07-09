
import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  X,
  GraduationCap,
  Airplay,
  Satellite,
  Mail
} from 'lucide-react';
const Download = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    purpose: "",
    country: "",
    termsAccepted: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();


  const capabilitiesRef = useRef<HTMLDivElement | null>(null);

  const scrollToCapabilities = () => {
    capabilitiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownload = () => {

    const link = document.createElement("a");
    link.href = "https://www.dropbox.com/scl/fo/1br7lxcv3psm7lels6sz7/AMtPbok7xBC-6B6lBO0ne0U?rlkey=kyx3l8cy0p1ai115az60m9lle&st=1n78nl7c&dl=1";
    link.download = "Drone_Simulator_Bundle.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };






  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) errors.name = "Full name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.phone.trim()) errors.phone = "Phone number is required.";
    if (!formData.city.trim()) errors.city = "City is required.";
    if (!formData.state.trim()) errors.state = "State/Province is required.";
    if (!formData.country.trim()) errors.country = "Country is required.";
    if (!formData.purpose.trim()) errors.purpose = "Please select a purpose.";
    if (!formData.termsAccepted) errors.termsAccepted = "Please accept the terms and conditions.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast({
        title: "Form Incomplete",
        description: "Please correct the highlighted fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setFormErrors({});
    setIsLoading(true);

    const safePassword = `${formData.name.replace(/\s/g, '')}@1234`;

    const payload = {
      email: formData.email,
      username: formData.name.split(' ')[0] || formData.name,
      password: safePassword,
      password_confirm: safePassword,
      full_name: formData.name,
      phone_number: formData.phone,
      city: formData.city,
      state_province: formData.state,
      country: formData.country,
      purpose_of_use: formData.purpose.toLowerCase()
    };

    const neodovePayload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      location: `${formData.city}, ${formData.state}, ${formData.country}`,
      remarks: `Purpose: ${formData.purpose}`
    };

    try {
      // Send to your primary API
      const response = await fetch("https://34-47-194-149.nip.io/api/download-app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Submission failed");

      // Send to NeoDove API with logging and error capture
      const neoRes = await fetch("https://8f21b23d-d474-422c-89b2-868a67b07e89.neodove.com/integration/custom/da0b1545-0690-4f36-b538-100a870026eb/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(neodovePayload)
      });

      const neoText = await neoRes.text();
      console.log("NeoDove API Response:", neoText);
      if (!neoRes.ok) {
        throw new Error("NeoDove API failed: " + neoText);
      }

      setIsSubmitted(true);
      toast({
        title: "Download Ready!",
        description: "Your download link has been generated successfully.",
      });

    } catch (error: any) {
      console.error("API Error:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const purposeOptions = [
    "Personal/Hobby Use",
    "Educational/Learning",
    "Professional Training",
    "Commercial Operations",
    "Research & Development",
    "Flight Instruction",
    "Other"
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white font-poppins">
        <Navigation />
        <section className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Thank You!
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Your download request has been processed successfully. Click Below download button to download the software and installation instructions.
            </p>

            <div className="relative w-full mb-8">
              {/* YouTube Video Floating in Corner */}
              <div className="fixed top-[160px] right-[30px] w-[240px] z-40 rounded-lg overflow-hidden shadow-md bg-white">
                <iframe
                  width="100%"
                  height="150"
                  src="https://www.youtube.com/embed/aWdmp_pTXmo"
                  title="Agri Mapping Masterclass"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                <div className="p-3 flex justify-center">
                  <button
                    onClick={() => window.open("https://youtu.be/aWdmp_pTXmo", "_blank")}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 text-sm font-semibold"
                  >
                    Watch this tutorial
                  </button>
                </div>
              </div>


              {/* Original Download Card (untouched) */}
              <Card className="bg-gradient-to-r from-primary to-accent text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Download Your Software</h3>
                  <p className="mb-6 opacity-90">
                    Click the button below to download the IPAGE Drone Simulators, Mobile Controller and IPage Drone Simulator Tutorial.
                  </p>
                  <Button
                    onClick={handleDownload}
                    className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3"
                  >
                    Download Software
                  </Button>
                </CardContent>
              </Card>
            </div>



            <div className="bg-blue-50 rounded-lg p-6 text-left mt-2 mb-12">
              <h4 className="font-semibold text-gray-900 mb-4">Next Steps:</h4>
              <ul className="space-y-4 text-[12px] text-gray-800">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-orange-500 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    Download and install IPage Drone Simulator on your Windows 10 or above PC
                    (or IPage Drone Simulator for ARM-based systems) to begin your training sessions.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-orange-500 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    Download and install the APK <strong>IPAGE Drone Mobile Controller</strong> on your Android device for remote control simulation,
                    or use one of the compatible RC controllers shown above —
                    <button
                      onClick={() => navigate('/features#capabilities')}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      FlySky CT6B
                    </button> for basic training or
                    <button
                      onClick={() => navigate('/features#capabilities')}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      FlySky FS-i6S
                    </button> for advanced simulator sessions. <br />
                    Once you're set up, launch the <strong>IPage Drone Simulator</strong> and start flying!
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-orange-500 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    Check out the IPage Drone Simulator Tutorial PDF to get started with step-by-step instructions.
                  </span>
                </li>
              </ul>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => navigate('/flytowin')}
                  className="animate-pulse bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full text-lg shadow-md"
                >
                  Fly to Win DGCA Certificate 🛫
                </button>
              </div>


            </div>

          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />

      {/* Hero Section */}
      <section className="mt-[80px] pt-4 pb-0 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">


          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Download
              <span className="text-primary"> DroneSimulator</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get instant access to the most comprehensive drone flight simulator.
              Fill out the form below to receive your download link.
            </p>
          </div>
        </div>
      </section>

      {/* Download Form */}
      <section className="pt-0 pb-10">


        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <Card className="shadow-2xl animate-fade-in">
              <CardHeader>
                <CardHeader className="pt-2 pb-0">
                  <CardTitle className="text-2xl font-bold text-gray-900 text-center mb-0 leading-tight">
                    Download Form
                  </CardTitle>
                </CardHeader>


              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="mt-1"
                      />
                      {formErrors.name && <p className="text-sm text-red-600 mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1"
                      />
                      {formErrors.email && <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1"
                      />

                      {formErrors.phone && <p className="text-sm text-red-600 mt-1">{formErrors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="mt-1"
                      />
                      {formErrors.city && <p className="text-sm text-red-600 mt-1">{formErrors.city}</p>}
                    </div>

                  </div>
                  <div>


                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="mt-1"
                    />
                    {formErrors.country && <p className="text-sm text-red-600 mt-1">{formErrors.country}</p>}
                  </div>


                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="mt-1"
                      />
                      {formErrors.state && <p className="text-sm text-red-600 mt-1">{formErrors.state}</p>}
                    </div>
                    <div>
                      <Label htmlFor="purpose">Purpose of Use *</Label>
                      <Select
                        value={formData.purpose}
                        onValueChange={(value) => handleInputChange("purpose", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          {purposeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {formErrors.purpose && <p className="text-sm text-red-600 mt-1">{formErrors.purpose}</p>}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the <span className="text-primary cursor-pointer">Terms & Conditions</span> and
                      <span className="text-primary cursor-pointer"> Privacy Policy</span>. I understand that my
                      information will be used to provide access to the DroneSimulator software.
                    </Label>
                    {formErrors.termsAccepted && <p className="text-sm text-red-600 mt-1">{formErrors.termsAccepted}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Get Download Link"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info Panel */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    What You'll Get
                  </h3>

                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>IPage Drone Simulator</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>IPage Drone Mobile Controller</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>IPage Drone Simulator Tutorial</span>
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">System Requirements</h3>
                  <ul className="space-y-6">
                    <li>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <p className="text-black font-semibold">IPage Drone Simulator</p>
                      </div>
                      <div className="ml-5 mt-2 space-y-1 text-black">
                        <p><span >Operating System:</span> Windows 10 or above</p>
                        <p><span >Storage:</span> 500 MB of available space</p>
                      </div>
                    </li>

                    <li>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <p className="text-black font-semibold">IPage Drone Mobile Controller</p>
                      </div>
                      <div className="ml-5 mt-2 space-y-1 text-black">
                        <p><span >Operating System:</span> Android 6.0 or higher</p>
                        <p><span >Storage:</span> 100 MB of available space</p>
                      </div>
                    </li>
                  </ul>




                </CardContent>


              </Card>



              <Card className="bg-gradient-to-r from-primary to-accent text-white w-96 mx-auto">
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-2">🔒 Your Privacy Matters</h3>
                  <p className="opacity-90 text-sm">
                    Your data is encrypted, securely stored, never shared, and you can opt out anytime.
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Download;
