class SearchAndFilter {
  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {
    var result = [];
    result = this.filterSearch(courses, search);
    result = this.filterSubject(result, subject);
    result = this.filterMaxCred(result, maximumCredits);
    result = this.filterMinCred(result, minimumCredits);   
    return result;
  }

  filterSearch(list, search){
    if(search === ""){return list;}
    var result = [];
    for(var i = 0; i < list.length; i++){
      if(list[i].keywords.includes(search)||this.contains(list[i].keywords, search)){
        result.push(list[i]);
      }
    }
    return result;
  }
  //helper to see if a keyword in keywords contains the search text
  contains(keywords, search){
    for(var i = 0; i < keywords.length; i++){
      if(keywords[i].includes(search)){
        return true;
      }
    }
    return false;
  }

  filterSubject(list, subject){
    if(subject === "All"){return list;}
    var result = [];
    for(var i = 0; i < list.length; i++){
      if(list[i].subject===subject){
        result.push(list[i]);
      }
    }
    return result;
  }

  filterMinCred(list, minCred){
    var min = parseInt(minCred);
    if(Number.isNaN(min)){return list;}

    var result = [];
    for(var i = 0; i < list.length; i++){
      if(list[i].credits>=min){
        result.push(list[i]);
      }
    }
    return result;
  }

  filterMaxCred(list, maxCred){
    var max = parseInt(maxCred);
    if(Number.isNaN(max)){return list;}

    var result = [];
    for(var i = 0; i < list.length; i++){
      if(list[i].credits<=max){
        result.push(list[i]);
      }
    }
    return result;
  }
}

export default SearchAndFilter;
