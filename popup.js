function main(){
  let textArea = document.getElementById("area")
  textArea.addEventListener("change", function(evt){
    chrome.storage.sync.set({"notes": evt.target.value})
  })
  chrome.storage.sync.get(["notes"], function(result){
    textArea.value = result["notes"]
  })
}
main()