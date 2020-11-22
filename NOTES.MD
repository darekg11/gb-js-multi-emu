# What might be broken (needs review once CPU is finished and we can run test ROMS):
1. Half-Carry logic in case of overflow / underflow
2. Half-Carry logic in case od SUB instructions
3. Half-Carry logic in case of 16 BITS OP Codes such as ADD HL, BC
4. STOP OP CODE
5. HALT OP CODE