'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Component() {
  const [, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const targetId = target.getAttribute('href')?.substring(1);
      const element = document.getElementById(targetId || '');
      element?.scrollIntoView({ behavior: 'smooth' });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        } else {
          entry.target.classList.remove('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll);
      });
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="sticky top-0 bg-white shadow-sm z-50 transition-all duration-300 ease-in-out hover:shadow-md">
        <div className="container mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logodefinitivo.svg" alt="Logo" width={40} height={40} className="transition-transform duration-300 hover:scale-110" />
            <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900 tracking-tight">MINDFUL.NET</span>
          </div>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            <Link href="#inicio" className="hover:text-gray-900 transition duration-300">Inicio</Link>
            <Link href="#informacion" className="hover:text-gray-900 transition duration-300">Información</Link>
            <Link href="#contacto" className="hover:text-gray-900 transition duration-300">Contacto</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-gray-900 transition duration-300">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <div className={`md:hidden bg-white py-2 px-4 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <Link href="#inicio" className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-300" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
          <Link href="#informacion" className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-300" onClick={() => setIsMenuOpen(false)}>Información</Link>
          <Link href="#contacto" className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-300" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
        </div>
      </nav>

      <header id="inicio" className="bg-gradient-to-b from-gray-100 to-white py-20 sm:py-32 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 text-gray-900 leading-tight tracking-tighter">MINDFUL.NET</h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-gray-700">Comprometidos con la educación consciente</h2>
        <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
          Descubre un nuevo camino hacia el bienestar emocional y el crecimiento personal a través de nuestras prácticas mindfulness y actividades educativas innovadoras.
        </p>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 py-20">
          <p className="text-lg sm:text-xl md:text-2xl text-center mb-16 text-gray-700 leading-relaxed animate-on-scroll max-w-4xl mx-auto">
            Bienvenido a <span className="font-semibold text-gray-900">MINDFUL.NET</span>, donde nos dedicamos a promover la educación consciente y el bienestar emocional. Nuestro enfoque integral combina prácticas de mindfulness con metodologías educativas innovadoras para fomentar el crecimiento personal y el desarrollo de habilidades socioemocionales.
          </p>
          <div className="flex justify-center mb-20 animate-on-scroll">
            <div className="aspect-square w-full max-w-2xl">
              <iframe
                width="100%"
                height="100%"
                src="/PRINCIPAL.mp4"
                title="Video principal de MINDFUL.NET"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="shadow-2xl rounded-lg transition-all duration-300 ease-in-out hover:shadow-3xl hover:scale-105"
              ></iframe>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-gray-900 animate-on-scroll leading-tight">
            Nuestros Tres Ejes Fundamentales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
            {[
              { title: "EMPATÍA", description: "Fomenta el respeto y la comprensión mutua, reduciendo conflictos al momento en que los estudiantes consideran los sentimientos y diferencias de los demás.",
                imageUrl: "/empatia.png" },
              { title: "RESILIENCIA", description: "Ayuda a los estudiantes a manejar conflictos y reacciones impulsivas, enseñándoles a adaptarse positivamente ante las dificultades.",
                imageUrl: "/ambiente.png" },
              { title: "INCLUSIÓN", description: "Promueve un ambiente donde todos se sienten aceptados y valorados, reduciendo actitudes excluyentes y mejorando la convivencia armónica en el aula desde el respeto a la diversidad.",
                imageUrl: "/estrategias.png" }
            ].map((item, index) => (
              <div key={index} className={`text-center p-8 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-50 animate-on-scroll`} style={{transitionDelay: `${index * 200}ms`}}>
                <Image src={item.imageUrl} alt={`Estrategia ${index + 1}`} width={200} height={200} className="mx-auto mb-8" />
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">{item.title}</h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="informacion" className="bg-gradient-to-b from-gray-100 to-white py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-20 text-gray-900 animate-on-scroll leading-tight">
              Nuestras Actividades
            </h2>
            {activities.map((activity, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center mb-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} animate-on-scroll`}>
                <div className="md:w-1/2 mb-12 md:mb-0">
                  <Image src={activity.imageUrl} alt={activity.title} width={500} height={375} className="rounded-xl shadow-2xl" />
                </div>
                <div className="md:w-1/2 md:px-12">
                  <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 leading-tight">{activity.title}</h3>
                  <p className="text-lg sm:text-xl mb-8 text-gray-700 leading-relaxed">{activity.description}</p>
                  <div className="mb-6">
                    <h4 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900">Objetivo</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{activity.objetivo}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900">Beneficio</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{activity.beneficio}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900">Actividad</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{activity.actividad}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 py-20 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-gray-900 animate-on-scroll leading-tight">
            ¡Comparte tu Experiencia Online!
          </h2>
          <p className="text-xl sm:text-2xl mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed animate-on-scroll">
            Tu voz es importante. Comparte tus experiencias, aprendizajes y reflexiones con nuestra comunidad y ayuda a inspirar a otros en su camino de crecimiento personal.
          </p>
          <a 
            href="https://padlet.com/sabrinapedrozo10/comparte-aqu-tu-experiencia-de-manera-online-73zuidht11e7knhv" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gray-900 text-white font-bold text-lg sm:text-xl rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-on-scroll"
          >
            Compartir mi experiencia
            <ArrowRight className="ml-3" size={24} />
          </a>
        </section>
      </main>

      <footer id="contacto" className="bg-gray-100 text-gray-900">
        <div className="container mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="animate-on-scroll">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">MINDFUL.NET</h3>
              <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">Transformando vidas a través de la conciencia plena</p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">Dirigido por las Licenciadas Sabrina Pedrozo </p>
            </div>
            <div className="animate-on-scroll" style={{transitionDelay: '200ms'}}>
              <h4 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">Enlaces rápidos</h4>
              <ul className="space-y-3">
                <li><Link href="#inicio" className="text-base sm:text-lg text-gray-700 hover:text-gray-900 transition duration-300">Inicio</Link></li>
                <li><Link href="#informacion" className="text-base sm:text-lg text-gray-700 hover:text-gray-900 transition duration-300">Información</Link></li>
                <li><Link href="#" className="text-base sm:text-lg text-gray-700 hover:text-gray-900 transition duration-300">Sobre nosotros</Link></li>
                <li><Link href="#" className="text-base sm:text-lg text-gray-700 hover:text-gray-900 transition duration-300">Servicios</Link></li>
              </ul>
            </div>
            <div className="animate-on-scroll" style={{transitionDelay: '400ms'}}>
              <h4 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">Contáctanos</h4>
              <p className="text-base sm:text-lg text-gray-700 mb-3 leading-relaxed">Email: info@mindful.net</p>
              <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">Teléfono: +1 234 567 890</p>
              <div className="flex space-x-6 mt-4">
                <a href="#" className="text-gray-700 hover:text-gray-900 transition duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 text-center py-6">
          <p className="text-sm sm:text-base text-gray-600">&copy; 2024 MINDFUL.NET. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

const activities = [
  {
    title: 'Dinámica del Espejo',
    description: 'La Dinámica del Espejo es una poderosa herramienta de autoconocimiento y empatía. Los participantes se enfrentan a su reflejo y al de otros, explorando sus emociones y percepciones en un entorno seguro y guiado.',
    objetivo: 'Fomentar la empatía y el respeto',
    beneficio: 'Fomenta la observación y la empatía al centrarse en ver al otro desde una perspectiva amable.',
    actividad: 'Los estudiantes se colocan en parejas y se observan durante unos minutos. Luego, imitan los gestos del otro como si fueran un espejo. Al final, cada uno comparte una cosa positiva que notó de su compañero.',
    imageUrl: '/dinamica del espejo.jpg'
  },
  {
    title: 'Meditación Guiada',
    description: 'La meditación guiada es una técnica de mindfulness en la que un instructor guía a los participantes a través de un proceso de relajación profunda.',
    objetivo: 'Conduce a la calma y la sana convivencia',
    beneficio: 'Ayuda a calmar la mente, reducir la ansiedad y mejorar la capacidad de enfoque.',
    actividad: 'Al inicio de cada jornada escolar, se llevará a cabo una breve sesión de meditación guiada. Puede ser realizada en el aula con la ayuda de una aplicación de meditación (como Calm o Headspace) o por un maestro capacitado. La sesión incluye instrucciones simples, como sentarse cómodamente, cerrar los ojos y concentrarse en la respiración, guiando a los estudiantes a relajarse y soltar la tensión acumulada.',
    imageUrl: '/dinamicadelespejo.jpg'
  },
  {
    title: 'Ejercicio de Gratitud y Autocompasión',
    description: 'Este ejercicio combina la práctica de la gratitud con el desarrollo de la autocompasión, ayudando a los estudiantes a cultivar una actitud positiva hacia sí mismos y su entorno.',
    objetivo: 'Promover una actitud positiva hacia uno mismo y los demás.',
    beneficio: 'Fomenta la autocompasión y una visión más positiva tanto de sí mismos como de su entorno.',
    actividad: 'Los estudiantes escriben en una hoja tres cosas por las que están agradecidos y luego tres cosas que les gustan de sí mismos. Después, pueden compartir voluntariamente algunas de sus respuestas.',
    imageUrl: '/ejerciciogratitud.jpg'
  },
  {
    title: 'Rueda de Reflexión Grupal',
    description: 'Esta actividad promueve la expresión emocional y la escucha activa en un entorno grupal, fomentando la empatía y la comprensión mutua.',
    objetivo: 'Facilitar la expresión de pensamientos y sentimientos, promoviendo la escucha activa.',
    beneficio: 'Mejora la comunicación interpersonal y la capacidad de expresar y comprender emociones.',
    actividad: 'Sentados en círculo, cada estudiante tiene la oportunidad de compartir cómo se ha sentido en situaciones de conflicto en el colegio y qué creen que podría ayudarles a mejorar. Los demás escuchan sin interrumpir.',
    imageUrl: '/reflexiongrupal.jpg'
  },
  {
    title: 'Uso de Aplicaciones de Meditación',
    description: 'Incorporar la tecnología en la práctica de mindfulness puede hacer que sea más accesible y atractiva para los estudiantes.',
    objetivo: 'Permitir que los estudiantes utilicen estos momentos de pausa para refrescarse mentalmente, mejorando su capacidad para retomar las clases con una mente más clara.',
    beneficio: 'Promueve el buen uso de la tecnología y ofrece herramientas prácticas para el manejo del estrés.',
    actividad: 'Los estudiantes pueden usar sus teléfonos móviles o dispositivos escolares para acceder a aplicaciones de meditación guiada durante los recreos o los intervalos entre clases. Las sesiones pueden durar entre 5 y 10 minutos y estar diseñadas específicamente para adolescentes, con ejercicios de relajación rápida, concentración y alivio de la ansiedad.',
    imageUrl: '/usodeaplicacionesdemeditacion.jpg'
  },
  {
    title: 'Arte Mindful',
    description: 'El arte como herramienta de expresión emocional y práctica de mindfulness puede ser muy efectivo para los estudiantes.',
    objetivo: 'Utilizar el arte como herramienta de conexión y reflexión.',
    beneficio: 'Promueve la expresión emocional y la creatividad, mejorando las relaciones interpersonales, la autoconciencia y la capacidad de manejar emociones difíciles.',
    actividad: 'Los estudiantes crean obras de arte (dibujos, collages) que representen sus emociones o momentos de gratitud. Al final, se organizan exposiciones en las que cada uno explica su obra. Esta actividad fomenta la autoexpresión y ayuda a los estudiantes a entender y respetar las emociones de los demás.',
    imageUrl: '/arte.jpg'
  },
  {
    title: 'Caminata Consciente',
    description: 'La caminata consciente es una forma de meditación en movimiento que ayuda a los estudiantes a conectar con su entorno y sus sensaciones corporales.',
    objetivo: 'Fomentar la observación y el agradecimiento por el ambiente escolar.',
    beneficio: 'Mejora la atención y la conexión con el entorno.',
    actividad: 'Organiza caminatas en grupos pequeños por el patio o el entorno escolar. Durante la caminata, los estudiantes deben concentrarse en sus pasos y en lo que los rodea: los sonidos, colores y olores. Al finalizar, comparten lo que han notado y aprendido, promoviendo una mayor conexión con sus compañeros y el entorno.',
    imageUrl: '/caminataconsiente.jpg'
  },
  {
    title: 'Diversión con Mandalas',
    description: 'Colorear mandalas es una actividad relajante que puede ayudar a los estudiantes a practicar la atención plena y la concentración.',
    objetivo: 'Utilizar herramientas que conecten las habilidades motoras con la concentración y atención.',
    beneficio: 'Incentiva la calma y paciencia.',
    actividad: 'Los niños colorean mandalas en silencio, concentrándose en los colores y en cada trazo que hacen. Esta actividad es una forma tranquila y artística de practicar mindfulness mientras fomenta la creatividad y el enfoque.',
    imageUrl: '/mandala.jpg'
  },
  {
    title: 'Círculo de la Escucha Activa',
    description: 'Esta actividad promueve la empatía y las habilidades de comunicación efectiva entre los estudiantes.',
    objetivo: 'Fomentar la empatía y la habilidad de escucha.',
    beneficio: 'Crea situaciones de convivencia que motivan la tolerancia y la validación de emociones.',
    actividad: 'Los niños se sientan en círculo y, uno a uno, comparten algo que quieren expresar (una emoción, una historia o un pensamiento). Los demás escuchan sin interrumpir. Luego, el grupo da retroalimentación positiva o ofrece apoyo. Esta actividad mejora la comunicación y les enseña a escuchar con atención y sin juzgar.',
    imageUrl: '/escuchaactiva.jpg'
  }
];