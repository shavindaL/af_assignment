import { useVotingCenterAuthContext } from '../../hooks/useVotingCenterAuthContext';

export default function Navbar() {
    const { location } = useVotingCenterAuthContext();
    return (
        <nav className="bg-blue-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex items-center">
                        {/* Right-aligned item */}
                        <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-[1000px]">
                            Center : {location && location.location} province
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
