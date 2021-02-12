const zadaci = [
  {
    id: 1,
    tekst: "Prosetaj psa",
    opis: "Ulicama...",
    zavrseno: false,
  },
  {
    id: 2,
    tekst: "Tekst zadatak2",
    opis: "Opis test zadatak",
    zavrseno: false,
  },
];
function prikaziZadatke() {
  let tabela_body = document.getElementById("tabela_svih_body");
  let tabela = [];
  for (let i = 0; i < zadaci.length; i++) {
    let zadatak = zadaci[i];
    let zavrseno_chk = "";
    let klasa_zavrseno = "";
    if (zadatak.zavrseno) {
      zavrseno_chk = "checked";
      klasa_zavrseno = "zavrseno";
    }
    let chk_box = `<input type="checkbox" onchange="zavrsiZadatak(${i})" ${zavrseno_chk}/>`;
    let dugme_brisanje = `<button class="btn btn-sm btn-danger" onclick="ukloniZadatak(${i})"><i class="fa fa-times"></i></button>`;
    let dugme_izmjena = `<button class="btn btn-sm btn-primary" onclick="izmjeniZadatak(${i})"><i class="fa fa-edit"></i></button>`;
    tabela.push(
      `<tr class="${klasa_zavrseno}"><td>${zadatak.id}</td><td>${zadatak.tekst}</td><td>${zadatak.opis}</td><td>${chk_box}</td><td>${dugme_brisanje}</td><td>${dugme_izmjena}</td></tr>`
    );
  }
  tabela_body.innerHTML = tabela.join("");
}
function generisiNoviId() {
  let max = 0;
  for (let i = 0; i < zadaci.length; i++) {
    if (zadaci[i].id > max) max = zadaci[i].id;
  }
  return max + 1;
}
function zavrsiZadatak(index) {
  zadaci[index].zavrseno = !zadaci[index].zavrseno;
  prikaziZadatke();
}
function ukloniZadatak(index) {
  if (confirm("da li ste sigurni?")) {
    zadaci.splice(index, 1);
    prikaziZadatke();
  }
}
function izmjeniZadatak(index) {
  let zadatak = zadaci[index];
  document.getElementById("izmjena_tekst").value = zadatak.tekst;
  document.getElementById("izmjena_opis").value = zadatak.opis;
  document.getElementById("indeks_izmjena").value = index;
  $("#modal_izmjena").modal("show");
}

prikaziZadatke();
document
  .getElementById("dodaj_novi_forma")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let novi_tekst = document.getElementById("novi_zadatak_tekst").value;
    let novi_opis = document.getElementById("novi_zadatak_opis").value;
    let novi_zadatak = {
      id: generisiNoviId(),
      tekst: novi_tekst,
      opis: novi_opis,
      zavrseno: false,
    };
    zadaci.push(novi_zadatak);
    prikaziZadatke();
    $("#modal_dodavanje").modal("hide");
    isprazniPolja("dodavanje");
  });
function isprazniPolja(tip) {
  if (tip == "izmjena") {
    document.getElementById("izmjena_tekst").value = "";
    document.getElementById("izmjena_opis").value = "";
    document.getElementById("indeks_izmjena").value = -1;
  } else if (tip == "dodavanje") {
    document.getElementById("novi_zadatak_tekst").value = "";
    document.getElementById("novi_zadatak_opis").value = "";
  }
}
document
  .getElementById("izmjena_zadatka_forma")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let index = document.getElementById("indeks_izmjena").value;
    zadaci[index].tekst = document.getElementById("izmjena_tekst").value;
    zadaci[index].opis = document.getElementById("izmjena_opis").value;
    prikaziZadatke();
    $("#modal_izmjena").modal("hide");
    isprazniPolja("izmjena");
  });
