import { useState } from "react";
import { Github, GraduationCap, MapPinned, SquarePen, Dumbbell } from "lucide-react";
import { Button } from "./ui/button";

const Profile = () => {
    const [About, SetAbout] = useState("");
    const [GithubUsername, SetGitHub] = useState("M-Pushkar-Varshney-K");
    const [skills, setSkills] = useState([
        "C++", "C", "Java", "Kotlin", "PHP", "JavaScript", "React", "Tailwind CSS", "Node.js"
    ]);

    return (
        <div className="flex items-start justify-start min-h-screen bg-gray-100 p-6">
            <aside className="max-w-md bg-white shadow-lg rounded-xl p-6">
                {/* Profile Image */}
                <div className="flex items-center space-x-4">
                    <div>
                        <img src="https://i.imgur.com/8Q6QlQF.jpg" className="w-24 h-24 rounded-full shadow-md" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-lg font-semibold text-gray-900">Full Name</h2>
                        <p className="text-gray-600">user_name</p>
                    </div>
                </div>

                {/* About Section */}
                <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-gray-800 font-semibold text-lg">About</h2>
                        <SquarePen className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900 transition" />
                    </div>
                    <p className="text-gray-500 font-medium mt-2">{About || "Tell us about you..."}</p>
                    <Button className="w-full mt-4 bg-green-500 text-white hover:bg-green-600 transition">Edit Profile</Button>
                </div>

                {/* Info Section */}
                <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-sm">
                        <MapPinned className="w-5 h-5 text-gray-600" />
                        <p className="text-gray-700">Kasganj, Uttar Pradesh, India</p>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-sm">
                        <GraduationCap className="w-5 h-5 text-gray-600" />
                        <p className="text-gray-700">Lovely Professional University</p>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-sm">
                        <Github className="w-5 h-5 text-gray-600" />
                        <a href={`https://github.com/${GithubUsername}`} className="text-gray-700 hover:text-blue-600">{GithubUsername}</a>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 mb-2 py-2">
                        <Dumbbell className="w-5 h-5 text-gray-600" />
                        <h2 className="text-gray-800 font-semibold">Skills</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((s, i) => (
                            <span key={i} className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm shadow-sm">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Profile;
