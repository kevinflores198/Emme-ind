# EMME Indumentaria. Landing con Carrito WhatsApp

Landing page desarrollada para EMME Indumentaria.

El sitio permite mostrar productos y gestionar compras a través de WhatsApp, sin utilizar un checkout tradicional.

---

## Objetivo del proyecto

Crear una landing moderna y simple que:

- Presente la marca
- Muestre productos
- Permita agregar productos a un carrito
- Finalice la compra vía WhatsApp
- Mantenga una experiencia rápida y directa para aumentar conversiones

---

## Funcionalidades implementadas

### 1. Carrito modal flotante
- El carrito se abre como popup (modal)
- No redirige a otra página
- Experiencia rápida y enfocada en la venta

### 2. Contador de productos
- Botón flotante con contador dinámico
- Muestra cuántos artículos hay en el carrito

### 3. Persistencia con localStorage
- El carrito no se pierde al refrescar la página
- Mejora experiencia del usuario

### 4. Eliminación con confirmación
- Botón para eliminar productos
- Mensaje de confirmación:
  > "¿Seguro que querés eliminar este artículo del carrito?"

### 5. Mensaje personalizado para WhatsApp
Al finalizar, se genera automáticamente un mensaje estructurado:

Hola! Me han gustado estos productos y quisiera saber cómo puedo pagarlos 

1- Producto:
Modelo:
Color:
Talle:

- Numeración automática
- Formato claro para el vendedor
- Conversación abierta para cerrar venta

---

## Enfoque estratégico

El sistema no incluye checkout ni pagos online.

La compra se finaliza por WhatsApp para:
- Generar confianza
- Permitir atención personalizada
- Reducir fricción
- Facilitar medios de pago manuales

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- localStorage
- API wa.me (WhatsApp)

---

## Próximas mejoras planificadas

- Conexión dinámica a Google Sheets como panel autogestionable
- Renderizado automático de productos
- Optimización responsive
- Mejoras visuales con identidad de marca
- Sistema escalable para múltiples productos

---

## Estado del proyecto

En desarrollo activo.
Primera versión funcional del sistema de carrito implementada en forma de prueba no aplicada al layout.

---

## Desarrollo

Proyecto desarrollado por Kevin Flores.

---

## Primera reunion 16 de Marzo

- Se acordó paleta de colores, estructura y trabajo de carrito-whatsapp. Aprovado.
- Se enviaron fotos para usar en la muestra del figma y la pagina.

## Segunda reunion 19 de Marzo
- Se termino el figma y se ha verificado cada punto a mejorar para comenzar con el layout.

## Tercera reunion 23 de Marzo 
- Se presento que se esta comenzando estructura de la pagina con Tailwind. 
- Hero del main terminado.
