function movieInputClick(callback) {
  let moVal = $("#movieInput").val().trim();
  let movie = callback(new Movie(moVal));
}


$("#movieInputSubmit").click(function() {
  movieInputClick((x) => {
      console.log(x)
  })
})
