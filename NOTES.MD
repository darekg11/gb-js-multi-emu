# What might be broken (needs review once CPU is finished and we can run test ROMS):
1. Half-Carry logic in case of overflow / underflow
2. Half-Carry logic in case od SUB instructions
3. Half-Carry logic in case of 16 BITS OP Codes such as ADD HL, BC
4. Need to return machine cycles for each OPCode execution
5. RETI - should it do more than just flip interrupt flag?
6. Interruptions - how?
7. STOP OP CODE
8. HALT OP CODE
9. PREFIX CB OP CODE