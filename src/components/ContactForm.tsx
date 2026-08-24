
import { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contac.module.css";

function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [estado, setEstado] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nombre.trim()) {
      setEstado("Por favor, ingresa tu nombre.");
      return;
    }

    if (!correo.trim()) {
      setEstado("Por favor, ingresa tu correo.");
      return;
    }

    if (!mensaje.trim()) {
      setEstado("Por favor, escribe un mensaje.");
      return;
    }

    setEstado("Enviando mensaje...");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          nombre,
          correo,
          mensaje,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setEstado("¡Mensaje enviado correctamente!");

      setNombre("");
      setCorreo("");
      setMensaje("");
    } catch {
      setEstado(
        "No se pudo enviar el mensaje. Inténtalo nuevamente."
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Contacto</h2>

      <div className={styles.campo}>
        <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            autoComplete="off"
            required
          />
        
      </div>

      <div className={styles.campo}>
        <label htmlFor="correo">Correo</label>

        <input
        id="correo"
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="tu@email.com"
        autoComplete="off"
        required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="mensaje">Mensaje</label>

       <textarea
        id="mensaje"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe tu mensaje"
        rows={5}
        required
        autoComplete="off"
      />
      </div>

      <button type="submit">Enviar mensaje</button>

      {estado && <p>{estado}</p>}
    </form>
  );
}

export default ContactForm;