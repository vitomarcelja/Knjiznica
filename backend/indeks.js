const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "ucka.veleri.hr",
  user: "vmarcelja",
  password: "11",
  database: "vmarcelja",
});

app.use(express.urlencoded({ extended: true }));

/*
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
*/

app.listen(port, () => {
  console.log("Server running at port: " + port);
});

app.get("/api/knjiga", (req, res) => {
  connection.query("SELECT * FROM knjiga", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


app.get("/api/knjiga/:id", (request, response) => {
  const id = request.params.id;
  response.send("jedna knjiga" + id);
});

app.post("/api/rezervirane_knjige", (req, res) => {
  const data = req.body;
  rezervacija = [[date.today, data.id_knjiga, data.id_korisnik]];

  connection.query(
    "INSERT INTO rezervacija (datum, knjiga, korisnik) VALUES ?",
    [rezervacija],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );

  //response.send("Poslano" + data.id_knjiga);
});

app.get("/api/knjiga/naslov/:naslov", (req, res) => {
  const naslov = req.params.naslov;
  connection.query(
    "SELECT * FROM knjiga WHERE naslov LIKE ?",
    [`%${naslov}%`],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.get("/api/knjiga/autor/:autor", (req, res) => {
  const autor = req.params.autor;
  connection.query(
    "SELECT * FROM knjiga WHERE autor LIKE ?",
    [`%${autor}%`],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.get("/api/slob_knjiga", (req, res) => {
  const query = `
    SELECT (knjiga.stanje - COUNT(rezervacija.knjiga)) AS slobodne, knjiga.id, knjiga.naslov, knjiga.stanje 
    FROM knjiga 
    LEFT JOIN rezervacija ON knjiga.id = rezervacija.knjiga 
    WHERE knjiga.stanje = 'dostupna'
    GROUP BY knjiga.id;
  `;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/slob_knjiga/:id_knjiga", (req, res) => {
  const id_knjige = req.params.id_knjige;
  const query = `
    SELECT (knjiga.stanje - COUNT(rezervacija.knjiga)) AS slobodne 
    FROM knjiga 
    LEFT JOIN rezervacija ON knjiga.id = rezervacija.knjiga 
    WHERE knjiga.id = ?
    GROUP BY knjiga.id;
  `;
  connection.query(query, [id_knjige], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/rezervirane_knjige", (req, res) => {
  connection.query(
    "SELECT * FROM knjiga, rezervacija WHERE knjiga.id = rezervacija.knjiga",
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.get("/api/rezervirane_knjige_korisnici", (req, res) => {
  const query = `
    SELECT * 
    FROM knjiga, rezervacija, korisnik 
    WHERE knjiga.id = rezervacija.knjiga AND korisnik.id = rezervacija.korisnik;
  `;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/rezervirane_knjige/:id_korisnik", (req, res) => {
  const id_korisnik = req.params.id_korisnik;
  const query = `
    SELECT * 
    FROM knjiga, rezervacija, korisnik 
    WHERE knjiga.id = rezervacija.knjiga 
    AND korisnik.id = rezervacija.korisnik 
    AND korisnik.id = ?;
  `;
  connection.query(query, [id_korisnik], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/rezervirane_knjige_knjiga/:id_knjiga", (req, res) => {
  const id_knjiga = req.params.id_knjiga;
  const query = `
    SELECT * 
    FROM knjiga, rezervacija, korisnik 
    WHERE knjiga.id = rezervacija.knjiga 
    AND korisnik.id = rezervacija.korisnik 
    AND knjiga.id = ?;
  `;
  connection.query(query, [id_knjiga], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/korisnici", (req, res) => {
  connection.query("SELECT * FROM korisnik", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/rezervirane_knjige", (req, res) => {
  const query = `
    SELECT 
      knjiga.naslov AS naslov, 
      knjiga.autor AS autor, 
      CONCAT(korisnik.ime, ' ', korisnik.prezime) AS korisnik, 
      rezervacija.datum AS datum_rez
    FROM rezervacija
    JOIN knjiga ON rezervacija.knjiga = knjiga.id
    JOIN korisnik ON rezervacija.korisnik = korisnik.id;
  `;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Greška kod dohvaćanja rezervacija:", error);
      res.status(500).send("Došlo je do pogreške.");
    } else {
      res.json(results);
    }
  });
});

app.get("/api/korisnici/:id_korisnik", (req, res) => {
  const id_korisnik = req.params.id_korisnik;
  connection.query(
    "SELECT * FROM korisnik WHERE id = ?",
    [id_korisnik],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.put("/api/korisnici/:id_korisnik", (req, res) => {
  const id_korisnik = req.params.id_korisnik;
  const { ime, prezime, korime, lozinka, email, broj_telefona } = req.body;
  const query = `
    UPDATE korisnik 
    SET ime = ?, prezime = ?, korime = ?, lozinka = ?, email = ?, broj_telefona = ? 
    WHERE id = ?;
  `;
  connection.query(
    query,
    [ime, prezime, korime, lozinka, email, broj_telefona, id_korisnik],
    (error, results) => {
      if (error) throw error;
      res.send({ message: "Korisnik azuriran!" });
    }
  );
});

app.post("/api/rezervirane_knjige/:id_knjiga", (req, res) => {
  const id_knjiga = req.params.id_knjiga;
  const { korisnik_id, datum } = req.body;
  const query =
    "INSERT INTO rezervacija (datum, knjiga, korisnik) VALUES (?, ?, ?)";
  connection.query(query, [datum, id_knjiga, korisnik_id], (error, results) => {
    if (error) throw error;
    res.send({ message: "Rezervacija uspješna!" });
  });
});

app.delete("/api/rezervirane_knjige/:id_knjiga", (req, res) => {
  const id_knjiga = req.params.id_knjiga;
  connection.query(
    "DELETE FROM rezervacija WHERE knjiga = ?",
    [id_knjiga],
    (error, results) => {
      if (error) throw error;
      res.send({ message: "Rezervacija obrisana!" });
    }
  );
});
