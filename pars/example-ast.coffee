Program [
  $debrujin
  Assignment {
    prefix: null,
    value: Expression {
      Function {
        name: null,
        arrowFunction: true,
        arguments: [a, n, b, s, A],
        defaults: [
          null,
          null,
          Expression {
            $a,
            At {
              char: l,
              prototype: length,
              isFunction: false,
            }
          },
          Expression {
            Property {
              prop: 0,
            },
            At {
              char: r,
              prototype: repeat,
              isFunction: true,
              inputs: [
                $n,
              ],
            },
          },
          Expression {
            Number {
              0,
            },
          },
        ],
        value: CodeBlock {
          Statement {
            While {
              cond: Expression {
                $s,
                At {
                  char: l,
                  prototype: length,
                  isFunction: false,
                },
                Operator {
                  'is less than',
                },
                $b,
                Operator {
                  'to the',
                },
                $n,
                Operator {
                  'minus',
                },
                Number {
                  0,
                },
                Operator {
                  'plus',
                },
                $n,
              }
              value: CodeBlock {
                Operator {
                  'if',
                  cond: Expression {
                    $s,
                    At {
                      char: M,
                      prototype: match,
                      isFunction: true,
                      inputs: [
                        Expression {
                          $s,
                          Slice {
                            from: Expression {
                              Number {
                                1,
                              },
                              Operator {
                                'minus',
                              },
                              $n,
                            },
                            to: null,
                          },
                        },
                        Operator {
                          'plus',
                        },
                        $a,
                        Property {
                          Expression {
                            $A,
                          },
                        },
                      ],
                    },
                  }
                  then: Expression {
                    Operator {
                      'plus-plus',
                      left: null,
                      right: Expression {
                        $A
                      },
                    },
                    
                  },
                },
              }
            }
          }
        }
      }
    }
  }
]
