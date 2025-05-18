const Event = require('../models/event');

exports.createEvent = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const { title, description, date, location } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      createdBy: req.user.id
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar evento', error: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar eventos' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar evento' });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(
      id,
      { title, description, date, location },
      { new: true }
    );
    if (!event) return res.status(404).json({ message: 'Evento não encontrado' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar evento' });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ message: 'Evento não encontrado' });
    res.json({ message: 'Evento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir evento' });
  }
};