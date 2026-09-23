# AATC Website — Panduan Pengguna / User Guide

---

## 🇲🇾 BAHASA MELAYU

### Cara Menukar Teks & Kandungan
Semua teks laman web ini disimpan dalam satu fail:

```
content.json
```

Buka fail ini menggunakan **Notepad** atau mana-mana aplikasi teks.

**Contoh — menukar nombor telefon:**
```json
"phone_1": "019-555 2008",
```
Tukar kepada:
```json
"phone_1": "011-1234 5678",
```
Kemudian **simpan** fail dan **muat semula** laman web dalam pelayar anda.

### Cara Menukar Gambar
Gambar laman web disimpan dalam folder:

```
images/
```

**Peraturan penting:**
- Gantikan gambar dengan memastikan **nama fail SAMA**.
- Contoh: jika fail asal ialah `trainer1.jpg`, gambar baru anda mesti bernama `trainer1.jpg` juga.
- Saiz gambar yang disyorkan:
  - Logo: **200 x 80 px** (PNG/SVG, latar belakang telus)
  - Foto Jurulatih: **400 x 500 px**
  - Gambar Bilik: **800 x 500 px**

### Senarai Nama Fail Gambar

| Fail                  | Penerangan                          |
|-----------------------|-------------------------------------|
| `images/logo.png`     | Logo syarikat                       |
| `images/trainer-hero.jpg` | Gambar jurulatih di bahagian utama |
| `images/trainer1.jpg` | Jurulatih 1                         |
| `images/trainer2.jpg` | Jurulatih 2                         |
| `images/trainer3.jpg` | Jurulatih 3                         |
| `images/room1.jpg`    | Bilik Tuisyen / Kelas               |
| `images/room2.jpg`    | Dewan Seminar Utama                 |
| `images/room3.jpg`    | Bilik Mesyuarat VIP                 |
| `images/client1.png`  | Logo Klien 1                        |
| `images/client2.png`  | Logo Klien 2                        |
| `images/client3.png`  | Logo Klien 3                        |
| `images/client4.png`  | Logo Klien 4                        |
| `images/client5.png`  | Logo Klien 5                        |

### Cara Melihat Laman Web
Klik dua kali pada fail `index.html` untuk membukanya dalam pelayar web anda.

> ⚠️ **Nota:** Untuk pautan media sosial berfungsi, buka fail `content.json` dan cari bahagian `social_media`. Gantikan tanda `"#"` dengan URL sebenar akaun anda, contoh: `"https://facebook.com/aatc"`

---

## 🇬🇧 ENGLISH

### How to Change Text & Content
All website text is stored in a single file:

```
content.json
```

Open this file with **Notepad** or any text editor.

**Example — changing a phone number:**
```json
"phone_1": "019-555 2008",
```
Change it to:
```json
"phone_1": "011-1234 5678",
```
Then **save** the file and **refresh** the website in your browser.

### How to Change Images
All website images are stored in the folder:

```
images/
```

**Important rules:**
- Replace any image by keeping the **EXACT SAME filename**.
- Example: if the original file is `trainer1.jpg`, your new image must also be named `trainer1.jpg`.
- Recommended image sizes:
  - Logo: **200 x 80 px** (PNG/SVG, transparent background)
  - Trainer Photos: **400 x 500 px**
  - Room Photos: **800 x 500 px**

### Image Filename Reference

| File                  | Description                         |
|-----------------------|-------------------------------------|
| `images/logo.png`     | Company logo                        |
| `images/trainer-hero.jpg` | Trainer photo in the hero section |
| `images/trainer1.jpg` | Trainer 1                           |
| `images/trainer2.jpg` | Trainer 2                           |
| `images/trainer3.jpg` | Trainer 3                           |
| `images/room1.jpg`    | Tuition / Classroom                 |
| `images/room2.jpg`    | Main Seminar Hall                   |
| `images/room3.jpg`    | VIP Meeting Room                    |
| `images/client1.png`  | Client Logo 1                       |
| `images/client2.png`  | Client Logo 2                       |
| `images/client3.png`  | Client Logo 3                       |
| `images/client4.png`  | Client Logo 4                       |
| `images/client5.png`  | Client Logo 5                       |

### How to View the Website
Simply double-click `index.html` to open it in your web browser.

> ⚠️ **Note:** To make social media links work, open `content.json` and find the `social_media` section. Replace each `"#"` with your actual social media URL, e.g. `"https://facebook.com/aatc"`

---

## 🗂 Project File Structure

```
AATC WEBSITE/
├── index.html          ← Main webpage (do not edit)
├── content.json        ← ALL text content — EDIT THIS FILE
├── README.md           ← This guide
├── css/
│   └── style.css       ← Website styles (do not edit)
├── js/
│   └── main.js         ← Website logic (do not edit)
└── images/             ← All website images — REPLACE FILES HERE
    ├── logo.png
    ├── trainer-hero.jpg
    ├── trainer1.jpg
    ├── trainer2.jpg
    ├── trainer3.jpg
    ├── room1.jpg
    ├── room2.jpg
    ├── room3.jpg
    └── client1-5.png
```
