# DNA Word Encoder

### Biology as a Language of Data

A **biomimicry-based digital project** that demonstrates how **DNA-inspired encoding** can be used to store and retrieve digital information.
The system converts text into **binary data**, maps it into **DNA bases (A, T, C, G)** using biologically inspired rules, generates a **complementary DNA strand**, and then decodes the sequence back to the original text.

This project was developed as part of the **Elements of Biology** course to explore how **biological systems inspire modern engineering and data technologies**.

---

## 🔬 Project Concept

DNA is nature’s most efficient information storage system.
It stores genetic instructions using only four bases while maintaining:

* Extremely high data density
* Long-term stability
* Error resistance through complementary base pairing

This project translates those **biological principles** into a **digital encoding model**.

---

## ⚙️ How the System Works

### 1. Text → Binary

Each character is converted into ASCII and then into **8-bit binary**.

Example:

```
A → 01000001
```

---

### 2. Binary → DNA Encoding

Binary data is grouped into **2-bit units** and mapped to DNA bases:

| Binary | DNA |
| ------ | --- |
| 00     | A   |
| 01     | C   |
| 10     | G   |
| 11     | T   |

This produces a **DNA sequence** representing the data.

---

### 3. Complementary DNA Strand

To maintain biological accuracy, a second DNA strand is generated using base-pairing rules:

* A ↔ T
* C ↔ G

This mimics the **double-stranded structure of real DNA** and demonstrates data integrity.

---

### 4. Decoding (DNA → Text)

The process is reversed:

* DNA bases → binary
* Binary → ASCII
* ASCII → original text

Successful decoding confirms that the information was **stored and retrieved correctly**.

---

## 🌐 Website Structure

The project is implemented as a **multi-page static website**:

* **Home** — Concept overview and introduction
* **Encoder** — Interactive DNA encoding and decoding tool
* **How It Works** — Visual explanation of the biological and computational process
* **About** — Academic context and project motivation

The website also includes a **meaningful loading screen** that visually represents biological processing during encoding and decoding.

---

## 🎨 Design Philosophy

* Clean and aesthetic UI (not cyberpunk or flashy)
* Dark and light theme support
* Smooth animations and transitions
* Subtle glow and motion for clarity
* Focus on readability and conceptual understanding

The design emphasizes **intentional motion** and **visual storytelling**, not decoration.

---

## 🛠️ Tech Stack

* **HTML5**
* **CSS3** (modular stylesheets)
* **JavaScript (Vanilla)**
* **GitHub Pages** for deployment

No backend or frameworks are used to keep the model lightweight, accessible, and easy to understand.

---

## 🚀 Live Demo

🔗 **Live Website:**
[(https://tuvya7.github.io/dna-word-encoder/)]

---

## 📚 Academic Context

* Course: **Elements of Biology**
* Topic: **Biomimicry & DNA-Based Data Storage**
* Model Type: **Digital Interactive Model**
* Focus: Biology → Engineering translation

---

## 🔮 Future Scope

* AI-optimized DNA encoding strategies
* Error-correction simulations
* Large-scale DNA data visualization
* Hybrid biological–digital storage models

---

## ✨ Development Note

This project was **vibe-coded** as part of a college academic assignment — built through rapid experimentation, iteration, and creative exploration while maintaining clear biological and engineering concepts.

The focus was on:

* Understanding the idea deeply
* Translating biology into code
* Designing a clean, aesthetic user experience

Rather than over-engineering, the project emphasizes **clarity, creativity, and conceptual correctness**.

---

## 📜 License

This project is created for **educational and academic purposes**.

Feel free to explore and learn from the code.
