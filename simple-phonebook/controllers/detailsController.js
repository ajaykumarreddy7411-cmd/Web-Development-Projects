import Phone from "../models/Phone.js";

export const getDetails = async (req, res) => {
    const details = await Phone.find().sort({ createdAt: -1 });
    res.json(details);
}

export const setDetails = async (req, res) => {
    const { name, phno, email } = req.body;
    const newRecord = new Phone({ name, phno, email });
    
    const savedRecord = newRecord.save();
    res.status(201)
    res.json({ success: true, newRecord });
    
}

export const delDetails = async (req, res) => {
    const { id } = req.params;
    await Phone.findByIdAndDelete(id);
    res.status(201).json({ message: "Record deleted successfully" });
}

export const updateDetails = async (req, res) => {
  try {
    const updated = await Phone.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // return updated doc + validate schema
    );

    if (!updated) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
