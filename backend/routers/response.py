from dataclasses import dataclass

@dataclass
class Response:
    status: bool = None
    code: int = None
    message: str = None
    data: None = None


def standard_response(status: bool, code: int, message: str, data=None):
    return Response(status=status,code=code,message=message,data=data if data else {}).__dict__

def response_model_format(attr):
    return Response(data=attr)
