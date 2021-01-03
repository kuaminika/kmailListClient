 
import configData from "../kConfig.json";//"../kConfig.json"; 
 
 
 function lanchKCourrier(kLib){

    var blankOptions = {
        mainHostUrl:""};

    var ids = 0;

    function generateId()
    {
        ids++;
        var id = "kCourrier"+ids;
        return id;
    }
    function generateOptions()
    {
        var id = generateId();
        var result = blankOptions;
        result.id = id;
        return result;
    }
    kLib.initCourrier = function(kCourierOptions)
    {

        kLib.activeCourriers = kLib.activeCourriers || {};

       if(kCourierOptions.id && kLib.activeCourriers[kCourierOptions.id]) return kLib.activeCourriers[kCourierOptions.id];


        var result = new KuaminikaCourrier(kCourierOptions);

        kLib.activeCourriers[kCourierOptions.id] = result;

        return result;
	}
	var apiMainOptions = generateOptions();
	
	kLib.APIMainCourrier = kLib.initCourrier( apiMainOptions);
	var mainOptions = generateOptions();

	kLib.MainCourrier = kLib.initCourrier(mainOptions);
    function KuaminikaCourrier(courrierOptions)
	{
        courrierOptions =  courrierOptions|| kLib.kCourierOptions;
		var urlForHost = courrierOptions.mainHostUrl || blankOptions.mainHostUrl;
		var self = this;

		self.hostURL = urlForHost;
		function snitchProblem(problem)
		{
			console.log(problem);
			console.error(problem);
	     }

		
		 self.post = function(restOfUrl,data,headerRules)
		 {
			 console.log("posting:"+restOfUrl);
			headerRules = headerRules || {  'Content-Type': 'application/json'  };
			
			var promiseResult = new Promise(function(resolve,reject)
			{

				reject = reject ||snitchProblem;
				try 
				{					
					var fullURL = self.hostURL+restOfUrl;

				 return 	fetch(fullURL,
						{
						  method: 'POST',
						  body: JSON.stringify(data),
						  headers: headerRules
						})        
						.then(response => {
							if (typeof(response) == "object") resolve(response);
							if(typeof(response)== "string")  resolve(JSON.parse(response));
						},reject)
				}
				catch(e)
				{
					snitchProblem(e);
				}			

			});

			

			return promiseResult;
 
		 }

		self.get= function(restOfUrl)
		{

			var promiseResult = new Promise(function(resolve,reject)
			{

				reject = reject ||snitchProblem;
				try
				{
					var fullURL = self.hostURL+restOfUrl;
					fetch(fullURL).then(resolve,reject);
				}
				catch(e)
				{
					snitchProblem(e);
				}			

			});

			

			return promiseResult;

		}	

	}


}


let klib= {}
lanchKCourrier(klib);
	let kCourrier =  klib.initCourrier({mainHostUrl:configData.SERVER_URL+'/'+configData.APP_NAME});
	
export default kCourrier;