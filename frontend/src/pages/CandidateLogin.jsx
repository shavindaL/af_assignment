const CandidateLogin = () => {

    return ( 

    <div className="w-screen h-screen bg-blue-700 bg-blue-850">

        <h1 className="text-white text-5xl text-center py-20 ">Election Candidtate Login</h1>

        <div className="flex flex-col space-y-4 pl-40 pr-20">
            <label for="username" class="text-white font-medium">Username :</label>
            <input type="text" id="username" name="username" class="px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-1/2" placeholder="Enter your username" />

            <label for="password" class="text-white font-medium pt-6">Password :</label>
            <input type="password" id="password" name="password" class="px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-1/2" placeholder="Enter your password" />
        </div>

        <button class="rounded-md bg-green-500 py-2 px-6 mt-20 hover:bg-green-600" style={{marginLeft:"850px"}}>Submit</button>
    </div>
  
    );
}
 
export default CandidateLogin;