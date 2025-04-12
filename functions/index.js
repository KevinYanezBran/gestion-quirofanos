const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

/**
 * OBTENER QUIRÓFANOS
 */
exports.getQuirofanos = onRequest(async (req, res) => {
    cors(req, res, async () => {
      try {
        const snapshot = await db.collection("quirofanos").get();
  
        console.log("Snapshot size:", snapshot.size);
  
        const quirófanos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(quirófanos);
      } catch (error) {
        console.error("🔥 Error en getQuirofanos:", error);
        res.status(500).json({ 
          error: "Error al obtener quirófanos: " + error.message,
          stack: error.stack
        });
      }
    });
  });
  

/**
 * AGREGAR QUIRÓFANO
 */
exports.addQuirofano = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    try {
      const { nombre, estado } = req.body;
      if (!nombre || !estado) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
      }

      const nuevo = {
        nombre,
        estado,
        equiposAsignados: []
      };

      const ref = await db.collection("quirofanos").add(nuevo);
      res.status(201).json({ id: ref.id, ...nuevo });
    } catch (error) {
      res.status(500).json({ error: "Error al agregar quirófano: " + error.message });
    }
  });
});

/**
 * ACTUALIZAR QUIRÓFANO
 */
exports.updateQuirofano = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "PUT") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    try {
      const { id, nombre, estado } = req.body;
      if (!id) {
        return res.status(400).json({ error: "Se requiere un ID" });
      }

      const updateData = {};
      if (nombre !== undefined) updateData.nombre = nombre;
      if (estado !== undefined) updateData.estado = estado;

      await db.collection("quirofanos").doc(id).update(updateData);
      res.status(200).json({ message: "Quirófano actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar quirófano: " + error.message });
    }
  });
});

/**
 * ELIMINAR QUIRÓFANO
 */
exports.deleteQuirofano = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "DELETE") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: "Se requiere un ID" });
      }

      await db.collection("quirofanos").doc(id).delete();
      res.status(200).json({ message: "Quirófano eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar quirófano: " + error.message });
    }
  });
});

/**
 * OBTENER EQUIPOS
 */
exports.getEquipos = onRequest(async (req, res) => {
    cors(req, res, async () => {
      try {
        const snapshot = await db.collection("equipos").get();
        const equipos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(equipos);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener equipos: " + error.message });
      }
    });
  });
  
  /**
   * AGREGAR EQUIPO
   */
  exports.addEquipo = onRequest(async (req, res) => {
    cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
      }
  
      try {
        const { nombre, estado, quirofanoId } = req.body;
        if (!nombre || !estado) {
          return res.status(400).json({ error: "Faltan campos obligatorios" });
        }
  
        const nuevo = { nombre, estado, quirofanoId: quirofanoId || null };
        const ref = await db.collection("equipos").add(nuevo);
        res.status(201).json({ id: ref.id, ...nuevo });
      } catch (error) {
        res.status(500).json({ error: "Error al agregar equipo: " + error.message });
      }
    });
  });
  
  /**
   * ACTUALIZAR EQUIPO
   */
  exports.updateEquipo = onRequest(async (req, res) => {
    cors(req, res, async () => {
      if (req.method !== "PUT") {
        return res.status(405).json({ error: "Método no permitido" });
      }
  
      try {
        const { id, nombre, estado, quirofanoId } = req.body;
        if (!id) return res.status(400).json({ error: "ID requerido" });
  
        const updateData = {};
        if (nombre !== undefined) updateData.nombre = nombre;
        if (estado !== undefined) updateData.estado = estado;
        if (quirofanoId !== undefined) updateData.quirofanoId = quirofanoId;
  
        await db.collection("equipos").doc(id).update(updateData);
        res.status(200).json({ message: "Equipo actualizado" });
      } catch (error) {
        res.status(500).json({ error: "Error al actualizar equipo: " + error.message });
      }
    });
  });
  
  /**
   * ELIMINAR EQUIPO
   */
  exports.deleteEquipo = onRequest(async (req, res) => {
    cors(req, res, async () => {
      if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Método no permitido" });
      }
  
      try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ error: "ID requerido" });
  
        await db.collection("equipos").doc(id).delete();
        res.status(200).json({ message: "Equipo eliminado correctamente" });
      } catch (error) {
        res.status(500).json({ error: "Error al eliminar equipo: " + error.message });
      }
    });
  });

  /**
 * OBTENER CIRUGÍAS
 */
exports.getCirugias = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection("cirugias").get();
      const cirugias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(cirugias);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener cirugías: " + error.message });
    }
  });
});

/**
 * AGREGAR CIRUGÍA
 */
exports.addCirugia = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    try {
      const { paciente, fecha, hora, estado, quirofanoId, equiposAsignados } = req.body;
      if (!paciente || !fecha || !hora || !estado || !quirofanoId) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
      }

      const nueva = {
        paciente,
        fecha,
        hora,
        estado,
        quirofanoId,
        equiposAsignados: equiposAsignados || []
      };

      const ref = await db.collection("cirugias").add(nueva);
      res.status(201).json({ id: ref.id, ...nueva });
    } catch (error) {
      res.status(500).json({ error: "Error al agregar cirugía: " + error.message });
    }
  });
});

/**
 * ACTUALIZAR CIRUGÍA
 */
exports.updateCirugia = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "PUT") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    try {
      const { id, paciente, fecha, hora, estado, quirofanoId, equiposAsignados } = req.body;
      if (!id) return res.status(400).json({ error: "ID requerido" });

      const updateData = {};
      if (paciente !== undefined) updateData.paciente = paciente;
      if (fecha !== undefined) updateData.fecha = fecha;
      if (hora !== undefined) updateData.hora = hora;
      if (estado !== undefined) updateData.estado = estado;
      if (quirofanoId !== undefined) updateData.quirofanoId = quirofanoId;
      if (equiposAsignados !== undefined) updateData.equiposAsignados = equiposAsignados;

      await db.collection("cirugias").doc(id).update(updateData);
      res.status(200).json({ message: "Cirugía actualizada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar cirugía: " + error.message });
    }
  });
});

/**
 * ELIMINAR CIRUGÍA
 */
exports.deleteCirugia = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "DELETE") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "ID requerido" });

      await db.collection("cirugias").doc(id).delete();
      res.status(200).json({ message: "Cirugía eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar cirugía: " + error.message });
    }
  });
});

  