class CacheManager {

    /***
     * This function list all cache content of your browser,
     * Not the cache but all css, images and scripts that are loaded onto the page.
     * This function takes a callback function that will deal with files found on the page
     */
    
    static getCache = (success)=>{
        let resourcesMap = new Map();
        let resources = document.querySelectorAll("img, link, script");

        let resourcesArray = [];
        if(resources){
            for(i=0;i<resources.length;i++){
                resourcesMap.set(`resources-item-${i}`,resources[i])
            }
        }


        resourcesArray = Array.from(resourcesMap, ([resId, tag])=>{
            return tag;
        })

        success(resourcesArray);
    }

    
    /***
     * This function replaces all cache content of your browser,
     * Not the cache but all css, images and scripts that are loaded onto the page.
     */
    
    static forceReplaceResources  = (resources)=>{
        let timeStamp = (new Date(Math.floor(Math.random()*100_000)))
        let params = Math.floor(timeStamp.getDate()*timeStamp.getDay()*Math.random()*timeStamp.getMilliseconds());

        let paramsKey = ["kactuce-cache-tmp", "crm-cache-tmp", "crm-2019-tmp", "cache-tmp", "kactuce-manager-tmp"];
        if(resources){
            for(let i=0;i<resources.length;i++){
                if(resources[i].tagName.toLowerCase().trim() === 'link'){
                    let delimiter="?"
                    if(resources[i].href.toString().indexOf("?")!==-1){
                        delimiter = "&"
                    }

                    resources[i].href = resources[i].href+`${delimiter}`+paramsKey[Math.floor((Math.random()*10)%5)]+"="+params
                }else if(resources[i].tagName.toLowerCase().trim() === 'img' || resources[i].tagName.toLowerCase().trim() === 'script'){
                    let delimiter="?"
                    if(resources[i].src.toString().indexOf("?")!==-1){
                        delimiter = "&"
                    }

                    resources[i].src = resources[i].src+`${delimiter}`+paramsKey[Math.floor((Math.random()*10)%5)]+"="+params
                }
            }
        }
    }

}
