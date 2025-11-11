import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FlyToSkyPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: 'Fly to Win DGCA Certificate',
      content: `
Special Offer for the First 100 Participants: Win a FREE DGCA Small Remote Pilot Training
Worth: ₹45,000
Winners: Anyone who completes 2h 30min of simulation, flies all 7 locations & scenarios, and completes the social media tasks
Note: Eligible winners must pay ₹8,000 as the DGCA Certificate Registration Fee to receive the certificate.

Eligibility Criteria:
1. Open to:
- Drone enthusiasts (students, freelancers, hobbyists)
- Defense personnel or aspirants
- Age 18 and above
- Residing in India

2. To Qualify:
- Complete 2h:30 minutes of flying in the simulator
- Complete the social media tasks
- Fly all 7 locations:
  1. RPTO Ground
  2. Agricultural Field
  3. Defense Zone
  4. Solar / HT Lines
  5. Bridge / Railway / Road/ Canal
  6. Factory / Industrial Zone
  7. Cityscape

3. Mandatory Registration:
- Sign up on www.dronesimulator.pro and complete the free demo session

4. Where to Track Progress:
- View your sessions and status in your Profile Page

Social Media Tasks:
1. Post a video (max 60 seconds) showcasing your positive experience with DroneSimulator.pro
2. Caption Example: 'Exploring the skies with #DroneSimulatorPro'
3. Tag Video and Photo/ Profile Page,
   Subscribe, and Follow on the following platforms:
   - Facebook: @dronesimulatorpro
   - Instagram: @dronesimulatorpro
   - LinkedIn
   - YouTube
   - X: @DroneSimulatorPro / @Drone_Simulator
4. Use Hashtags:
   - #DroneSimulatorPro
   - #IndiaDroneAcademy
   - #IPageums

Deadline:
Complete the challenge within the trial 14 days from registration.

Drone Type:
Use any drone available in the simulator, including quadcopters, fixed-wing, or VTOL aircraft.

Simulation Scenarios:
1. Free Flight: Practice basic maneuvers
2. Shapes: Navigate geometric shapes for control
3. Mission Plan: Follow a mission to test surveying, mapping, or inspection

Winner Selection:
Winners will be selected from those who:
1. Complete the required simulation time
2. Complete the social media tasks
Winners will be notified via email and will receive DGCA Small Remote Pilot Certificate (RPC) through our partner, India Drone Academy.
      `
    },
    {
      title: 'Terms and Conditions for "Fly to Win It" Campaign',
      content: `
1. Eligibility:
1.1 The campaign is open to individuals who are:
- Drone enthusiasts (students, freelancers, hobbyists)
- Defense personnel or aspirants
- Aged 18 years and above
- Residing in India

1.2 Employees, contractors, and agents of DroneSimulator.pro and their immediate family members are not eligible to participate.

2. Campaign Period:
2.1 The campaign is valid for a limited period of 14 days from the date of registration. Participants must complete the simulation challenge within this time frame to qualify.

3. How to Enter:
3.1 To participate, participants must:
- Sign up on www.dronesimulator.pro
- Complete the free demo simulation session
- Complete 2:30 minutes of flying and complete all 7 locations within the simulator

4. Social Media Requirements:
4.1 Participants must post the video/photo and caption example: 'Exploring the skies with #DroneSimulatorPro'
4.2 Participants must tag and follow DroneSimulator.pro on the following platforms: Facebook, Instagram, LinkedIn, YouTube, X
4.3 Use Hashtags: #DroneSimulatorPro #IndiaDroneAcademy #IPageums

5. Winner Selection:
5.1 Winners will be selected based on the following criteria:
- Completion of the required 2:30 minutes of flying time
- Successful completion of the 7 locations in the simulation
- Submission of the social media post that meets the campaign requirements

5.2 Winners will be notified by email within 7 days after the end of the campaign period.

6. Prize Details:
6.1 The winners will receive a FREE DGCA Small Remote Pilot Training worth ₹45,000.
6.2 ₹8,000 will be charged as the DGCA Certificate Registration Fee for all winners. The fee must be paid directly to India Drone Academy for the certificate issuance process.
6.3 The balance DGCA Drone Pilot training fee will be paid by DroneSimulator.pro.
6.4 Winners will also be provided training through India Drone Academy as part of the prize.

7. General Conditions:
7.1 By participating in this campaign, participants agree to abide by these terms and conditions and accept the decisions of the organizing team as final.
7.2 DroneSimulator.pro reserves the right to disqualify any participant if they are found to have violated the rules or engaged in fraudulent behavior.
7.3 DroneSimulator.pro reserves the right to modify or cancel the campaign at any time without prior notice.
7.4 The prize is non-transferable and cannot be exchanged for cash or any other alternatives.

8. Privacy and Data Usage:
8.1 By entering the campaign, participants agree to the collection and use of their personal data for the purpose of the competition.
8.2 All personal data will be handled in accordance with DroneSimulator.pro’s privacy policy.

9. Limitation of Liability:
9.1 DroneSimulator.pro is not responsible for any loss, damage, or injury caused by the participation in the campaign or the acceptance and use of the prize.

10. Governing Law:
10.1 This campaign and its terms and conditions are governed by the laws of India. Any disputes arising from the campaign will be subject to the exclusive jurisdiction of the courts located in Hyderabad / Telangana.
      `
    }
  ];

  const toggleSection = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300 text-white">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Fly to Win DGCA Certificate</h1>

        <div className="flex justify-end gap-4 text-sm mb-4">
          <button
            className="text-white underline"
            onClick={() => setActiveIndex(null)}
          >
            CLOSE ALL
          </button>
          <button
            className="text-white underline"
            onClick={() => setActiveIndex(-1)}
          >
            EXPAND ALL
          </button>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => {
            const isOpen = activeIndex === index || activeIndex === -1;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md">
                <button
                  className="w-full flex justify-between items-center text-left px-4 py-4 text-black font-semibold text-lg"
                  onClick={() => toggleSection(index)}
                >
                  {index + 1}. {section.title}
                  {isOpen ? <ChevronUp className="h-5 w-5 text-orange-500" /> : <ChevronDown className="h-5 w-5 text-orange-500" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-6 text-gray-700 whitespace-pre-wrap text-sm">
                    {section.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FlyToSkyPage;