import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

const HelpPage: React.FC = () => {
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [screenshots, setScreenshots] = useState<File[]>([]);
    const [description, setDescription] = useState("");
    const [allowEmail, setAllowEmail] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const dropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setVisible(location.pathname === '/contact');
    }, [location.pathname]);

    useEffect(() => {
        const dropArea = dropRef.current;
        const handlePaste = (e: ClipboardEvent) => {
            if (e.clipboardData && e.clipboardData.files.length > 0) {
                handleFiles(e.clipboardData.files);
            }
        };
        if (dropArea) {
            dropArea.addEventListener("paste", handlePaste);
        }
        return () => {
            if (dropArea) {
                dropArea.removeEventListener("paste", handlePaste);
            }
        };
    }, []);

    const handleFiles = (files: FileList | File[]) => {
        const validFiles = Array.from(files).filter(file => file.type.startsWith("image/"));
        setScreenshots(prev => [...prev, ...validFiles]);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const toggleSection = (key: string) => {
        setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const expandAll = () => {
        const allExpanded: Record<string, boolean> = {};
        sections.forEach(section => allExpanded[section.key] = true);
        setExpandedSections(allExpanded);
    };

    const closeAll = () => {
        const allCollapsed: Record<string, boolean> = {};
        sections.forEach(section => allCollapsed[section.key] = false);
        setExpandedSections(allCollapsed);
    };

    const handleFeedbackSubmit = async () => {
        const token = sessionStorage.getItem("auth_token");
        if (!token) {
            alert("You must be logged in to send feedback.");
            return;
        }

        const formData = new FormData();
        formData.append("description", description);
        screenshots.forEach((file) => {
            formData.append("images", file);
        });

        try {
            const response = await fetch("https://34-124-167-179.nip.io/api/feedback/", {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: formData,
            });

            const result = await response.json();
            console.log("✅ API Response:", result);

            if (response.ok) {
                alert("✅ Feedback submitted successfully!");
                setDescription("");
                setScreenshots([]);
                setShowFeedback(false);
            } else {
                alert("❌ Failed to submit feedback: " + (result?.detail || "Unknown error"));
            }
        } catch (error) {
            console.error("Feedback Error:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    if (!visible) return null;

    const sections = [
        {
            key: "gettingStarted",
            title: "Getting Started",
            content: (
                <>
                    <p className="mb-1 font-medium">How to Get Started with Drone Simulator</p>
                    <ul className="list-disc pl-4 text-gray-600">
                        <li>Sign Up: Create an account using your email and set up your profile.</li>
                        <li>Download the Simulator: Install the simulator on your device (Windows).</li>
                        <li>Explore the Dashboard: Navigate modules, track progress, view certificates.</li>
                        <li>Start Training: Choose modules and begin drone flight training.</li>
                    </ul>
                </>
            )
        },
        {
            key: "firstTime",
            title: "First Time Setup",
            content: (
                <ul className="list-disc pl-4 text-gray-600">
                    <li>Set your preferences (language, region)</li>
                    <li>Choose your training path (Pro, Student, or Institution plan)</li>
                    <li>Access your first training module</li>
                    <li>Learn the basic controls and navigation</li>
                </ul>
            )
        },
        {
            key: "features",
            title: "Features of Drone Simulator",
            content: (
                <>
                    <p className="font-medium mb-1">Training Modules</p>
                    <ul className="list-disc pl-4 text-gray-600">
                        <li>Basic Flight</li>
                        <li>Advanced Maneuvers</li>
                        <li>Real-World Scenarios</li>
                    </ul>
                </>
            )
        },
        {
            key: "tracking",
            title: "Tracking Your Progress",
            content: (
                <p className="text-gray-600">
                    Monitor your training status, completed modules, mastered scenarios, and performance from your dashboard.
                </p>
            )
        },
        {
            key: "faq",
            title: "FAQs",
            content: (
                <ul className="list-disc pl-4 text-gray-600">
                    <li><b>What is Drone Simulator?</b> A cloud-based flight simulation platform.</li>
                    <li><b>How do I sign up?</b> Enter your email and confirm via email link.</li>
                    <li><b>System Requirements:</b> Win10, Intel i5+, 8GB RAM, GTX 1060+, 2GB free space.</li>
                    <li><b>Upgrade Plan:</b> Go to Account → Upgrade Plan and choose your tier.</li>
                    <li><b>Free Trial:</b> 15-day free access to all features.</li>
                    <li><b>What USB controllers are supported?</b> Flysky FS-i6S, and others.</li>
                    <li><b>What keyboard controls are available?</b> <a href="https://drive.google.com/uc?export=download&id=1VfPOgz_cG_4sr0_8z9_T97Pml3Twytz-" className="text-blue-600 underline ml-1" target="_blank" rel="noopener noreferrer">Check here</a></li>
                    <li><b>How realistic are the flight controls?</b> Real-world physics engine simulates actual drone behavior.</li>
                    <li><b>Are new aircraft & scenarios free?</b> Yes, downloadable updates are free with valid license.</li>
                    <li><b>Student Offers:</b> Students using .edu or .ac.in emails can access special discounted pricing tiers.</li>
                </ul>
            )
        },
        {
            key: "account",
            title: "Account Management",
            content: (
                <ul className="list-disc pl-4 text-gray-600">
                    <li>Update profile via Account Settings</li>
                    <li>Reset password through Forgot Password</li>
                    <li>Check billing and subscriptions in Subscription Settings</li>
                </ul>
            )
        },
        {
            key: "support",
            title: "Technical Support",
            content: (
                <>
                    <ul className="list-disc pl-4 text-gray-600">
                        <li>Simulator not launching? Check drivers & requirements.</li>
                        <li>Freezing? Restart or reinstall simulator.</li>
                        <li>Login issues? Try password reset or contact support.</li>
                        <li>To report a problem, click on <strong>Send Feedback</strong> and fill out the form. Our team will resolve it as soon as possible.</li>
                    </ul>
                    <p className="mt-2 text-gray-600">
                        Contact support at <a href="mailto:support@dronesimulator.pro" className="text-blue-600">support@dronesimulator.pro</a>
                    </p>
                </>
            )
        }
    ];

    return (
        <>
            <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40" />
            <div className="fixed bottom-0 right-0 w-[350px] md:w-[400px] bg-white rounded-tl-xl rounded-bl-xl shadow-2xl z-50 h-[90vh] flex flex-col overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b font-semibold text-lg">
                    {showFeedback ? 'Send Feedback' : 'Help & Support'}
                    <button onClick={() => showFeedback ? setShowFeedback(false) : window.history.back()} className="text-gray-600 text-xl hover:text-black">×</button>
                </div>
                {!showFeedback ? (
                    <div className="p-4 overflow-y-auto text-sm flex-1 space-y-4">
                        <p className="text-sm text-gray-700">
                            Welcome to the Drone Simulator Help Center. Whether you’re a new user or an experienced pilot, our guides, FAQs, and support contact are here to assist you.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button onClick={expandAll} className="text-orange-600 text-xs font-semibold hover:underline">EXPAND ALL</button>
                            <span className="text-gray-300">|</span>
                            <button onClick={closeAll} className="text-orange-600 text-xs font-semibold hover:underline">CLOSE ALL</button>
                        </div>
                        {sections.map(({ key, title, content }) => (
                            <div key={key} className="border rounded-lg">
                                <button
                                    onClick={() => toggleSection(key)}
                                    className="w-full text-left font-semibold flex justify-between items-center px-4 py-2 hover:bg-orange-50"
                                >
                                    <span>{title}</span>
                                    <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center">
                                        {expandedSections[key] ? '−' : '+'}
                                    </span>
                                </button>
                                {expandedSections[key] && (
                                    <div className="px-4 pb-3 text-sm text-gray-700">
                                        {content}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="text-center mt-4">
                            <button
                                onClick={() => setShowFeedback(true)}
                                className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-sm"
                            >
                                Send Feedback
                            </button>
                        </div>
                        <div className="text-center">
                            <a href="https://drive.google.com/uc?export=download&id=1VfPOgz_cG_4sr0_8z9_T97Pml3Twytz-"
                                className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm"
                                download>
                                Download Simulator Manual
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 space-y-4 text-sm flex-1 overflow-y-auto" ref={dropRef} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                        <div>
                            <label className="font-medium block mb-1">Describe your feedback (required)</label>
                            <textarea
                                rows={4}
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Tell us what prompted this feedback..."
                                className="w-full border px-3 py-2 rounded"
                            ></textarea>
                        </div>
                       <div className="mb-4">
  <label className="block font-medium mb-1">Upload screenshots (optional)</label>
  <div
    ref={dropRef}
    onDrop={handleDrop}
    onDragOver={(e) => e.preventDefault()}
    className="border-2 border-dashed border-gray-400 rounded-md p-5 text-center bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer"
  >
    <p className="text-gray-600 text-sm">
      <span className="font-medium">Drag & drop</span> images here, or
      <span className="text-blue-600 underline ml-1">click to browse</span><br />
      (You can also paste screenshots with <kbd>Ctrl</kbd> + <kbd>V</kbd>)
    </p>
    <input
      type="file"
      name="images"
      accept="image/*"
      multiple
      onChange={(e) => handleFiles(e.target.files || [])}
      className="hidden"
      id="uploadInput"
    />
  </div>

  {/* Invisible label triggers file input click */}
  <label htmlFor="uploadInput" className="sr-only">Upload Images</label>

  {screenshots.length > 0 && (
    <ul className="text-xs mt-2 text-gray-600 list-disc pl-4">
      {screenshots.map((file, i) => (
        <li key={i}>{file.name}</li>
      ))}
    </ul>
  )}
</div>

                        <div>
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={allowEmail}
                                    onChange={(e) => setAllowEmail(e.target.checked)}
                                />
                                We may email you for more information or updates
                            </label>
                        </div>
                        <div className="text-xs text-gray-500">
                            Some <span className="text-blue-600 underline">account and system information</span> may be sent to DroneSimulator.
                            See our <Link to="/privacy-policy" className="text-blue-600 underline">Privacy Policy</Link> and{' '}
                            <Link to="/terms" className="text-blue-600 underline">Terms of Service</Link>.
                        </div>
                        <button
                            onClick={handleFeedbackSubmit}
                            className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded"
                        >
                            Send
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default HelpPage;