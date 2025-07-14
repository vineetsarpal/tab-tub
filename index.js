let myTabs = []

const dropTabBtn = document.getElementById("drop-tab-btn")
const emptyTubBtn = document.getElementById("empty-tub-btn")
const ulEl = document.getElementById("ul-el")

const tabsFromLocalStorage = JSON.parse(localStorage.getItem("myTabs"))

if (tabsFromLocalStorage) {
    myTabs = tabsFromLocalStorage
    render(myTabs)
}

dropTabBtn.addEventListener("click", function(){
    const tabID = Date.now().toString()  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myTabs.push({ tabID, tabURL: tabs[0].url })
        localStorage.setItem("myTabs", JSON.stringify(myTabs))
        render(myTabs)
    })
})

emptyTubBtn.addEventListener("click", function() {
    if (confirm("Are you sure you want to empty the tub?")) {
        localStorage.clear()
        myTabs = []
        render(myTabs)
    }
})

function render(tabs) {
    let listItems = ""
    for (let i = 0; i < tabs.length; i++) {
        const tabID = tabs[i].tabID
        const tabURL = tabs[i].tabURL
        listItems += `
            <li>
                <a target='_blank' href='${tabURL}'>
                    ${tabURL}
                </a>
                <button class="delete-x" data-tabID="${tabID}">X</button>
            </li>
        `
    }
    ulEl.innerHTML = listItems

    document.querySelectorAll('.delete-x').forEach(button => {
        button.addEventListener('click', function() {
          const tabID = this.getAttribute('data-tabID');
          deleteTab(tabID);
        });
      });
}

function deleteTab(delTabID) {
    console.log("deleting tab", delTabID)
    myTabs = myTabs.filter(tab => tab.tabID !== delTabID)
    localStorage.setItem("myTabs", JSON.stringify(myTabs))
    render(myTabs)
}